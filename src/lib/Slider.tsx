import React, { Component, useRef } from 'react';
import { ISliderDefaultProps as P, PointerValue, TweenStartedAction } from "./Types";
import { tween, inertia, ColdSubscription, listen, pointer, value, calc, ValueReaction } from "popmotion";
import { SliderContext, DefaultSliderProps } from "./SliderContext";
import styler, { Styler } from "stylefire";
import sync, { cancelSync } from "framesync";
import "../css/style.scss";

export interface IProps extends P {

    /**
     * Total slides in this slider
     */
    totalSlides: number;

    /**
     * How mange slides per step (when click next button) 
     */
    slidesPerStep: number;

    /**
     * Current slide index (from 0)
     */
    currentSlide: number;


}

interface IState {
}

export class Slider extends Component<IProps, IState> {

    public static defaultProps: Pick<IProps,
        keyof (typeof DefaultSliderProps) | "currentSlide">
        = {
            ...DefaultSliderProps,
            currentSlide: 0,
        };

    public sliderTrayRef = React.createRef<HTMLDivElement>();
    public sliderTraystyler!: Styler;
    public pointerTracker: ColdSubscription | undefined;
    public listenActions: (ColdSubscription | undefined)[] = [];
    public inertiaAction: ColdSubscription | undefined;
    public valueXY!: ValueReaction;

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }
    onLeftArrowClick = () => {
        this.sliderTrayRef.current?.scrollBy({
            left: -this.sliderTrayRef.current.offsetWidth,
            behavior: 'smooth',
        });
    };

    onRightArrowClick = () => {
        this.sliderTrayRef.current?.scrollBy({
            left: this.sliderTrayRef.current.offsetWidth,
            behavior: 'smooth',
        });
    };

    onScroll = (e: React.UIEvent<HTMLDivElement>) => {

    };

    applyOverdrag(x: number, max: number) {
        // const max = 300;
        const tug = 0.1;
        let rx = x;

        if (x < 0) rx = calc.getValueFromProgress(0, x, tug);
        if (x > max) rx = calc.getValueFromProgress(max, x, tug);
        // console.log("original", v, "result", r);

        return rx;
    };

    startTracking = (evt: Event) => {
        console.log(evt);
        if (this.sliderTrayRef.current) {
            const trayElement = this.sliderTrayRef.current;
            let startPoint = trayElement.scrollLeft;
            let offset = 0;
            this.valueXY = value({ x: 0, y: 0 }, (a: PointerValue) => {
                // value got updated, and then
                // update style
                // console.log(a);
                console.log(a, startPoint);
                let targetScrollX = startPoint + offset - a.x;

                if (targetScrollX < 0) {
                    offset = a.x;
                }
                else {
                    trayElement.scrollTo(targetScrollX, 0);
                }
            });

            // need remove scroll-snap
            trayElement.classList.remove("scroll-snap");

            // pointer already tracking mouse movement
            this.pointerTracker = pointer({
                x: 0,
                y: 0
            }).start(this.valueXY); // update ball value
        }
    };

    stopTracking = () => {
        if (this.pointerTracker && this.sliderTrayRef.current) {
            const trayElement = this.sliderTrayRef.current;

            this.pointerTracker.stop();
            this.pointerTracker = undefined; // avoid mouseup on document

            // trayElement.classList.add("scroll-snap");


            this.inertiaAction = inertia({
                from: this.valueXY.get(),
                velocity: this.valueXY.getVelocity(),

                bounceStiffness: 500,

                // spring oscillation lv
                bounceDamping: 30,

                // how heavy: hard 0 - 1 light
                power: 0.4,
                // set min and/or max boundaries:
                // When the animated value breaches max, it’ll snap to max using a spring animation.
                min: 0,
                max: 300,

                restDelta: 0.5,

                timeConstant: 500
                // This can be used, for instance, to snap the target to a grid:
                // modifyTarget: (target:any) => Math.ceil(target.x / 100) * 100
            }).start({
                update: (a: any) => {
                    // console.log("inertia update");
                    this.valueXY.update(a);
                },
                complete: () => {
                    trayElement.classList.add("scroll-snap");

                }
            });
        }
    };

    componentDidMount(): void {
        // window.addEventListener("scroll", startTracking, false);
        if (this.sliderTrayRef.current) {
            this.sliderTraystyler = styler(this.sliderTrayRef.current);

            this.listenActions.push(listen(this.sliderTrayRef.current, "mousedown").start(this.startTracking));
            this.listenActions.push(listen(window.document, "mouseup").start(this.stopTracking));
        }
    }

    componentWillUnmount(): void {
        for (let i of this.listenActions) {
            if (i) i.stop();
        }
    }

    render() {
        const {
            slideHeight,
            slideWidth,
            visibleSlides,
        } = this.props;


        return (
            <div className="react-scroll-snap-anime-slider">

                <div className="slider" >
                    <div
                        className="slider-tray css-only"
                        onScroll={this.onScroll}
                        ref={this.sliderTrayRef}
                    >
                        {/* Context uses reference identity to determine when to re-render, this will cause consumer to re-render every time */}
                        <SliderContext.Provider value={{ visibleSlides, slideHeight, slideWidth }}>
                            {this.props.children}
                        </SliderContext.Provider>
                    </div>

                    <button className="slider-button slider-left-button" onClick={this.onLeftArrowClick}>&lt;</button>

                    <button className="slider-button slider-right-button" onClick={this.onRightArrowClick}>&gt;</button>

                </div>
            </div>
        );
    }
}

export default Slider;
