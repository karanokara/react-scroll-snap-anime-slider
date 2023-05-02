import React, { Component, useRef } from 'react';
import { ISliderDefaultProps as P, PointerValue, TweenStartedAction } from "./Types";
import { tween, inertia, ColdSubscription, listen, pointer, value, calc, ValueReaction, easing } from "popmotion";
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
    public scrollValue!: ValueReaction;
    public mouseDownAction: ColdSubscription | undefined;
    public mouseUpAction: ColdSubscription | undefined;
    public pointerAction: ColdSubscription | undefined;
    public inertiaAction: ColdSubscription | undefined;
    public snapAction: ColdSubscription | undefined;

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

    onScroll = (evt: Event) => {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            console.log("scroll", trayElement.scrollLeft);
        }
    };

    /**
     * When start tracking mouse action
     * @param evt 
     */
    startTracking = (evt: MouseEvent) => {
        console.log("start tracking", evt);
        let scrollMax = this.getScrollMax();

        if (this.inertiaAction) {
            this.inertiaAction.stop();
            this.inertiaAction = undefined;
        }

        if (this.snapAction) {
            this.snapAction.stop();
            this.snapAction = undefined;
        }

        if (this.sliderTrayRef.current && scrollMax > 0) {
            let trayElement = this.sliderTrayRef.current;
            let startPoint = trayElement.scrollLeft;
            let newStartPoint = startPoint;

            this.scrollValue = value(startPoint, (newValue: number) => {
                // value got updated, and then
                // update style
                // console.log(a);
                // console.log("update:", newValue, "start point:", startPoint);

                trayElement.scrollTo(newValue, 0);
            });

            // need to remove scroll-snap so can use mouse to move slide
            trayElement.classList.remove("scroll-snap");

            // pointer already tracking mouse movement
            this.pointerAction = pointer({
                x: 0,
                y: 0
            }).pipe((next: PointerValue) => {
                let x = newStartPoint - next.x;

                if (x < 0) {
                    newStartPoint = next.x;
                    return { x: 0, y: next.y };
                }
                else if (x > scrollMax) {
                    newStartPoint = startPoint + next.x;
                    return { x: scrollMax, y: next.y };
                }

                return { x: x, y: next.y };
            }).start({
                update: (a: PointerValue) => {
                    // console.log("pointer", a);
                    this.scrollValue.update(a.x);
                }
            });

            // listen for mouse up
            this.mouseUpAction = listen(window.document, "mouseup").start(this.stopTracking);
        }
    };

    /**
     * When stop tracking mouse action
     * 
     * @param evt 
     * @returns 
     */
    stopTracking = (evt: MouseEvent) => {
        if (this.pointerAction && this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let scrollMax = this.getScrollMax();
            let fromValue = this.scrollValue.get();
            let velocity = this.scrollValue.getVelocity();
            let toStop = false;
            let onComplete = () => {
                console.log("complete!!");
                trayElement.classList.add("scroll-snap");
                this.mouseUpAction?.stop();
            };
            let snap = (from: number, to: number) => tween({
                from: from,
                to: to,
                duration: 300,
                ease: easing.easeOut,
            }).start({
                update: (a: number) => this.scrollValue.update(a),
                complete: onComplete
            });

            this.pointerAction.stop();
            this.pointerAction = undefined;

            console.log("stop tracking, scroll:", fromValue, "vel:", velocity);

            if (velocity === 0) {
                return onComplete();
            }

            let startToUpdateInertia = false;
            let inertiaAction = inertia({
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
                    update: (scrollValue: number) => {
                        // filter out first time update that make vel to be 0 
                        if (!startToUpdateInertia) {
                            startToUpdateInertia = true;
                            return;
                        }

                        let vel = this.scrollValue.getVelocity();

                        // console.log("inertia update, vel", vel);

                        this.scrollValue.update(scrollValue);

                        if (Math.abs(vel) < 150) {
                            console.log("stop inertia, vel:", vel);
                            inertiaAction.stop();
                            let targetScrollValue = this.getTargetScrollValue(scrollValue, vel > 0);
                            this.snapAction = snap(scrollValue, targetScrollValue);
                        }
                    },
                    complete: onComplete
                });
            this.inertiaAction = inertiaAction;

        }
    };

    applyOverdrag(x: number, max: number) {
        // const max = 300;
        let tug = 0.1;
        let rx = x;

        if (x < 0) rx = calc.getValueFromProgress(0, x, tug);
        if (x > max) rx = calc.getValueFromProgress(max, x, tug);
        // console.log("original", v, "result", r);

        return rx;
    }

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

    /**
     * Get a snap point when the free scrolling is done
     * @param currentScrollValue 
     * @param isDown is scrolling down? 
     */
    getTargetScrollValue(currentScrollValue: number, isDown: boolean) {
        let targetScrollValue = currentScrollValue;

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.props.visibleSlides;
            let slideCount = trayElement.childElementCount;
            let targetSlideNo = 0;

            if (isDown) {
                targetSlideNo = Math.ceil(currentScrollValue / slideWidth);
            }
            else {
                targetSlideNo = Math.floor(currentScrollValue / slideWidth);
            }

            if (targetSlideNo <= slideCount) {
                targetScrollValue = targetSlideNo * slideWidth;
            }
        }

        return targetScrollValue;
    }

    componentDidMount(): void {
        // window.addEventListener("scroll", startTracking, false);

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;

            this.sliderTraystyler = styler(trayElement);

            // listen mouse down
            this.mouseDownAction = listen(trayElement, "mousedown").start(this.startTracking);

            // listen scroll
            trayElement.addEventListener("scroll", this.onScroll, false);

        }
    }

    componentWillUnmount(): void {
        this.mouseDownAction?.stop();
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
