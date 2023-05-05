import React, { Component } from 'react';
import { ISliderDefaultProps as P, PointerValue, } from "./Types";
import { tween, inertia, ColdSubscription, listen, pointer, value, calc, ValueReaction, easing } from "popmotion";
import { SliderContext, DefaultSliderContextProps } from "./SliderContext";
import styler, { Styler } from "stylefire";
// import sync, { cancelSync } from "framesync";
import "../css/style.scss";

export interface IProps extends P {

    /**
     * Total slides in this slider
     */
    totalSlides: number;

    /**
     * Current slide index (from 0)
     */
    currentSlide: number;


}

export interface IState {
    currentSlide: number;
}

export class Slider extends Component<IProps, IState> {

    public static defaultProps: Pick<IProps,
        keyof (P) | "currentSlide">
        = {
            ...DefaultSliderContextProps,
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
    public tempCurrentSlide: number;     // hold a temp slide index when in animation

    constructor(prop: IProps) {
        super(prop);

        this.tempCurrentSlide = this.props.currentSlide;

        this.state = {
            currentSlide: this.props.currentSlide,
        };
    }

    onClickNext = () => {
        this.slideNext();
    };

    onClickBack = () => {
        this.slideBack();
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

        this.stopAnimeActions();

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
                this.snapAction = undefined;
                trayElement.classList.add("scroll-snap");
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

            this.mouseUpAction?.stop();
            this.pointerAction.stop();
            this.pointerAction = undefined;

            console.log("stop tracking, scroll from:", fromValue, "vel:", velocity);

            if (velocity === 0) {
                // not scrolling fast enough
                // snap to target
                let targetScrollValue = this.getSnapScrollValue(fromValue as number, velocity);
                this.snapAction = snap(fromValue as number, targetScrollValue);
                return;
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

                        if (Math.abs(vel) < 250) {
                            inertiaAction.stop();
                            let targetScrollValue = this.getSnapScrollValue(scrollValue, vel);
                            console.log("stop inertia, vel:", vel, "scroll to", targetScrollValue);
                            this.snapAction = snap(scrollValue, targetScrollValue);
                        }
                    },

                    // this may not be called, keep it here for safe
                    complete: onComplete
                });
            this.inertiaAction = inertiaAction;

        }
    };

    /**
     * Slide from current point to next of previous point
     * 
     * TODO: be able to keep speed and then accelerate to next, next target 
     * @param isNext
     */
    slideTo(isNext: boolean) {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let startPoint = trayElement.scrollLeft;
            let currentScrollValue = trayElement.scrollLeft;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.props.visibleSlides;
            let slideCount = trayElement.childElementCount;
            let currentSlide = Math.round(currentScrollValue / slideWidth);
            let maxSlide = slideCount - this.props.visibleSlides;
            let step = this.props.slidesPerStep > 0
                ? (this.props.slidesPerStep < this.props.visibleSlides
                    ? this.props.slidesPerStep
                    : this.props.visibleSlides)
                : 1;
            let onComplete = () => {
                console.log("complete!!");
                this.snapAction = undefined;
                trayElement.classList.add("scroll-snap");

                // update current slide index
            };
            let nextSlide = isNext
                ? this.tempCurrentSlide + step
                : this.tempCurrentSlide - step;

            if (nextSlide > maxSlide) {
                this.tempCurrentSlide = maxSlide;
            }
            else if (nextSlide < 0) {
                this.tempCurrentSlide = 0;
            }
            else {
                this.tempCurrentSlide = nextSlide;
            }

            if (currentSlide === this.tempCurrentSlide)
                return;

            let targetScrollValue = this.tempCurrentSlide * slideWidth;

            this.stopAnimeActions();

            trayElement.classList.remove("scroll-snap");

            this.snapAction = tween({
                from: startPoint,
                to: targetScrollValue,
                duration: 300,
                ease: easing.easeOut,
            }).start({
                update: (v: number) => {
                    trayElement.scrollTo(v, 0);
                },
                complete: onComplete
            });
        }
    }

    slideNext() {
        this.slideTo(true);
    }

    slideBack() {
        this.slideTo(false);
    }

    stopAnimeActions() {
        if (this.inertiaAction) {
            this.inertiaAction.stop();
            this.inertiaAction = undefined;
        }

        if (this.snapAction) {
            this.snapAction.stop();
            this.snapAction = undefined;
        }
    }

    /**
     * Get a target value instead of X value to avoid overdrage
     * 
     * @param x 
     * @param max 
     * @returns 
     */
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
     * Get a snap point when the free scrolling is done base on current value and direction
     * 
     * @param currentScrollValue 
     * @param isDown >0 is scrolling down, <0 is up, =0 unknown 
     */
    getSnapScrollValue(currentScrollValue: number, isDown: number) {
        let targetScrollValue = currentScrollValue;

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.props.visibleSlides;
            let slideCount = trayElement.childElementCount;
            let targetSlideNo = 0;

            if (isDown > 0) {
                targetSlideNo = Math.ceil(currentScrollValue / slideWidth);
            }
            else if (isDown < 0) {
                targetSlideNo = Math.floor(currentScrollValue / slideWidth);
            }
            else {
                targetSlideNo = Math.round(currentScrollValue / slideWidth);
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
            slidesPerStep,
        } = this.props;

        let slideCount = 0;
        if (this.props.children) {
            if (Array.isArray(this.props.children))
                slideCount = this.props.children.length;
            else
                slideCount = 1;
        }

        return (
            <div className="react-scroll-snap-anime-slider">

                <div className="slider" >
                    <div
                        className="slider-tray css-only"
                        ref={this.sliderTrayRef}
                    >
                        {/* Context uses reference identity to determine when to re-render, this will cause consumer to re-render every time */}
                        <SliderContext.Provider
                            value={{
                                visibleSlides,
                                slideHeight,
                                slideWidth,
                                slideCount,
                                slidesPerStep,
                                onNext: this.onClickNext,
                                onBack: this.onClickBack,
                            }}
                        >
                            {this.props.children}
                        </SliderContext.Provider>
                    </div>

                    <button className="slider-button slider-left-button" onClick={this.onClickBack}>&lt;</button>

                    <button className="slider-button slider-right-button" onClick={this.onClickNext}>&gt;</button>

                </div>
            </div>
        );
    }
}

export default Slider;
