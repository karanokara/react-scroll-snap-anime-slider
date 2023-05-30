import React, { Component, CSSProperties } from 'react';
import { IProps as P, PointerValue, } from "./Types";
import { tween, inertia, ColdSubscription, listen, pointer, value, calc, ValueReaction, easing } from "popmotion";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";
// import styler, { Styler } from "stylefire";
// import sync, { cancelSync } from "framesync";
import { cn } from "./Utility";
import { ss } from "./Styles";

export type OnScrollProps = {
    scrollLeft: number;
    currentSlide: number;
    slideWidth: number;
    trayWidth: number;
};

export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Props to the slider tray
     */
    trayProps?: React.HTMLAttributes<HTMLDivElement>;

    /**
     * A callback function when slider is sliding
     * 
     * @param props 
     * @returns 
     */
    onSlide?: (props: OnScrollProps) => void;
}

export interface IState {
}

export class Slider extends Component<IProps, IState> {

    // context props from Carousel
    public context!: React.ContextType<typeof CarouselContext>;

    public sliderTrayRef = React.createRef<HTMLDivElement>();
    // public sliderTraystyler!: Styler;
    public scrollValue!: ValueReaction;
    public mouseDownAction: ColdSubscription | undefined;
    public mouseUpAction: ColdSubscription | undefined;
    public pointerAction: ColdSubscription | undefined;
    public inertiaAction: ColdSubscription | undefined;
    public snapAction: ColdSubscription | undefined;
    public tempCurrentSlide: number = 0;     // hold a temp slide index when in animation (the slide on the left side)

    constructor(prop: IProps) {
        super(prop);


    }

    /**
     * On scrolling from any action (touchpad, mouse drag, button)
     * @param evt 
     */
    onScroll = (evt: Event) => {
        // console.log("onScroll", evt);

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.context.visibleSlides;
            let scrollLeft = trayElement.scrollLeft;

            // update subscriber
            for (let i = 0; i < this.context.subscribers.length; ++i) {
                this.context.subscribers[i](trayWidth, slideWidth, scrollLeft);
            }

            // console.log("scroll", trayElement.scrollLeft);

            // update slide index
            this.updateSlideIndex();

            if (this.props.onSlide) {
                this.props.onSlide({
                    scrollLeft,
                    currentSlide: this.context.currentSlide,
                    slideWidth: slideWidth,
                    trayWidth: trayWidth,
                });
            }
        }
    };

    /**
     * On using touchpad or mouse wheel to scroll
     * @param evt 
     */
    onWheel = (evt: Event) => {
        // let ev = evt as WheelEvent;
        // console.log("onWheel", evt);

        // stop current actions when using wheel to scroll
        this.stopAnimeActions();

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            // add back class
            !this.context.freeScroll && trayElement.classList.add(...ss("scroll-snap"));
        }
    };

    /**
     * When start tracking mouse action
     * @param evt 
     */
    startTracking = (evt: MouseEvent) => {
        // console.log("start tracking", evt);
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
            !this.context.freeScroll && trayElement.classList.remove(...ss("scroll-snap"));

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
                // console.log("complete tracking!!");
                this.snapAction = undefined;
                !this.context.freeScroll && trayElement.classList.add(...ss("scroll-snap"));
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

            // console.log("stop tracking, scroll from:", fromValue, "vel:", velocity);

            if (velocity === 0) {
                // not scrolling fast enough
                // snap to target if not free scroll
                if (!this.context.freeScroll) {
                    let targetScrollValue = this.getSnapScrollValue(fromValue as number, velocity);
                    this.snapAction = snap(fromValue as number, targetScrollValue);
                }

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
                    update: (v: number) => {
                        // filter out first time update that make vel to be 0 
                        if (!startToUpdateInertia) {
                            startToUpdateInertia = true;
                            return;
                        }

                        let vel = this.scrollValue.getVelocity();

                        // console.log("inertia update, vel", vel);

                        this.scrollValue.update(v);

                        if (Math.abs(vel) < 250) {
                            if (!this.context.freeScroll) {
                                inertiaAction.stop();
                                this.inertiaAction = undefined;

                                let targetScrollValue = this.getSnapScrollValue(v, vel);
                                // console.log("stop inertia, vel:", vel, "scroll to", targetScrollValue);
                                this.snapAction = snap(v, targetScrollValue);
                            }
                        }
                    },

                    // this will be called when not using snapping (free scrolling)
                    complete: onComplete
                });
            this.inertiaAction = inertiaAction;

        }
    };

    /**
     * Get current slide index (the slide on the left side)
     * @returns 
     */
    getCurrentSlideIndex() {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let currentScrollValue = trayElement.scrollLeft;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.context.visibleSlides;
            let currentSlide = Math.round(currentScrollValue / slideWidth);
            return currentSlide;
        }
        return 0;
    }

    updateSlideIndex() {
        // update slide index
        let newSlideIndex = this.getCurrentSlideIndex();
        // console.log("temp", this.tempCurrentSlide, "new index", newSlideIndex);
        if (this.tempCurrentSlide !== newSlideIndex) {
            this.tempCurrentSlide = newSlideIndex;
            // console.log("update context slide index:", this.tempCurrentSlide);
            this.context.updateContext({ currentSlide: this.tempCurrentSlide });
        }
    }

    /**
     * Slide to a target slide
     * 
     * @param slideIndex From 0 ~ (len-1), this target slide will be the slide on the left side (if visible slide > 1)
     * @param animated Using animation?
    */
    slideTo(slideIndex: number, animated: boolean = true) {
        // TODO: be able to keep speed and then accelerate to next, next target 
        if (this.sliderTrayRef.current) {
            this.stopAnimeActions();

            let trayElement = this.sliderTrayRef.current;
            let startPoint = trayElement.scrollLeft;
            let trayWidth = trayElement.offsetWidth;
            let slideWidth = trayWidth / this.context.visibleSlides;
            // let maxSlide = this.context.totalSlides - this.context.visibleSlides;
            // let tempCurrentSlide = 0;
            let onComplete = () => {
                // console.log("complete slide to!!");
                this.snapAction = undefined;

                !this.context.freeScroll && trayElement.classList.add(...ss("scroll-snap"));
            };

            let targetScrollValue = slideIndex * slideWidth;

            !this.context.freeScroll && trayElement.classList.remove(...ss("scroll-snap"));

            this.snapAction = tween({
                from: startPoint,
                to: targetScrollValue,
                duration: animated ? 300 : 0,
                ease: easing.easeOut,
            }).start({
                update: (v: number) => {
                    trayElement.scrollTo(v, 0);
                },
                complete: onComplete
            });
        }
    }

    /**
     * Stop current active anime actions
     * 
     * @returns current slide index if there is anime action which is not finished
     */
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
            let slideWidth = trayWidth / this.context.visibleSlides;
            let slideCount = trayElement.childElementCount;
            let max = slideWidth * (slideCount - this.context.visibleSlides);

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
            let slideWidth = trayWidth / this.context.visibleSlides;
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

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        // update context
        this.context.slideTo = (i: number) => this.slideTo(i, true);
    }

    componentDidMount(): void {
        // window.addEventListener("scroll", startTracking, false);

        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;

            // this.sliderTraystyler = styler(trayElement);

            // listen mouse down
            this.mouseDownAction = listen(trayElement, "mousedown").start(this.startTracking);

            // listen scroll
            trayElement.addEventListener("scroll", this.onScroll, false);

            // listen touchpad or mouse wheel
            // there will be only one event listener being used 
            // 1st one is using
            trayElement.addEventListener("mousewheel", this.onWheel, false);
            trayElement.addEventListener("DOMMouseScroll", this.onWheel, false);
        }

        // check current slide
        if (this.tempCurrentSlide !== this.context.currentSlide) {
            this.slideTo(this.context.currentSlide, false);
        }

        // update context
        this.context.slideTo = (i: number) => this.slideTo(i, true);
    }

    componentWillUnmount(): void {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;

            this.stopAnimeActions();
            this.mouseDownAction?.stop();
            this.pointerAction?.stop();
            trayElement.removeEventListener("scroll", this.onScroll, false);
            trayElement.removeEventListener("mousewheel", this.onWheel, false);
            trayElement.removeEventListener("DOMMouseScroll", this.onWheel, false);
        }
    }

    render() {
        const {
            children,
            className,
            trayProps,
            ...otherProps
        } = this.props;

        // let slideCount = 0;
        // if (this.props.children) {
        //     if (Array.isArray(this.props.children))
        //         slideCount = this.props.children.length;
        //     else
        //         slideCount = 1;
        // }
        let trayStyle: CSSProperties = {};

        if (this.context.margin) {
            trayStyle.marginLeft = "-" + this.context.margin;
            trayStyle.marginRight = "-" + this.context.margin;
        }

        return (

            <div
                {...otherProps}
                className={cn(ss("slider"), className)}
            >
                <div
                    {...trayProps}
                    className={cn(ss("slider-tray"), ss("css-only"), (this.context.freeScroll ? "" : ss("scroll-snap")), trayProps?.className)}
                    style={{
                        ...trayProps?.style,
                        ...trayStyle,
                    }}
                    ref={this.sliderTrayRef}
                >
                    {/* Context uses reference identity to determine when to re-render, this will cause consumer to re-render every time */}
                    {/* <SliderContext.Provider
                        value={{
                            ...this.context,
                            slideCount,

                        }}
                    >
                    </SliderContext.Provider> */}

                    {children}
                </div>
            </div>
        );
    }
}

Slider.contextType = CarouselContext;
