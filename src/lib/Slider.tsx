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
    public scrollValue!: ValueReaction;

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
        let tug = 0.1;
        let rx = x;

        if (x < 0) rx = calc.getValueFromProgress(0, x, tug);
        if (x > max) rx = calc.getValueFromProgress(max, x, tug);
        // console.log("original", v, "result", r);

        return rx;
    };

    /**
     * Get max scroll x, y
     * 
     * @returns if >0 has a max scroll, if <0 not able to scroll
     */
    getScrollMax() {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.props.visibleSlides;
            let slideCount = trayElement.childElementCount;
            let max = slideWidth * (slideCount - this.props.visibleSlides);

            return max;
        }
        return 0;
    }

    startTracking = (evt: Event) => {
        console.log("start tracking", evt);
        let scrollMax = this.getScrollMax();

        if (this.inertiaAction) {
            this.inertiaAction.stop();
        }

        if (this.sliderTrayRef.current && scrollMax > 0) {
            let trayElement = this.sliderTrayRef.current;
            let startPoint = trayElement.scrollLeft;
            let newStartPoint = startPoint;

            this.scrollValue = value(startPoint, (newValue: number) => {
                // value got updated, and then
                // update style
                // console.log(a);
                console.log("update", newValue, startPoint);

                trayElement.scrollTo(newValue, 0);
            });

            // need remove scroll-snap
            trayElement.classList.remove("scroll-snap");

            // pointer already tracking mouse movement
            this.pointerTracker = pointer({
                x: 0,
                y: 0
            }).pipe((latest: PointerValue) => {
                let x = newStartPoint - latest.x;

                if (x < 0) {
                    newStartPoint = latest.x;
                    return { x: 0, y: latest.y };
                }
                else if (x > scrollMax) {
                    newStartPoint = startPoint + latest.x;
                    return { x: scrollMax, y: latest.y };
                }

                return { x: x, y: latest.y };
            }).start({
                update: (a: PointerValue) => {
                    console.log("pointer", a);
                    this.scrollValue.update(a.x);
                }
            });
        }
    };

    stopTracking = () => {
        if (this.pointerTracker && this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let scrollMax = this.getScrollMax();
            let onComplete = () => {
                console.log("complete!!");
                trayElement.classList.add("scroll-snap");
            };

            this.pointerTracker.stop();
            this.pointerTracker = undefined; // avoid mouseup on document

            // trayElement.classList.add("scroll-snap");

            let fromValue = this.scrollValue.get();
            let velocity = this.scrollValue.getVelocity();
            let toStop = false;
            console.log("stop tracking: ", fromValue, velocity);

            if (velocity === 0) {
                return onComplete();
            }

            this.inertiaAction = inertia({
                from: fromValue,
                velocity: velocity,

                bounceStiffness: 500,

                // spring oscillation lv
                bounceDamping: 30,

                // how heavy: hard 0 - 1 light
                power: 0.4,

                // set min and/or max boundaries:
                // When the animated value breaches max, it’ll snap to max using a spring animation.
                // min: 0,
                // max: scrollMax,

                restDelta: 0.4,

                timeConstant: 500
                // This can be used, for instance, to snap the target to a grid:
                // modifyTarget: (target:any) => Math.ceil(target.x / 100) * 100
            })
                .while(v => !toStop)
                .pipe((v: number) => {
                    if (v < 0) {
                        toStop = true;
                        return 0;
                    }
                    else if (v > scrollMax) {
                        toStop = true;
                        return scrollMax;
                    }
                    return v;
                })
                .start({
                    update: (a: number) => {
                        // console.log("inertia update");
                        this.scrollValue.update(a);
                    },
                    complete: onComplete
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
