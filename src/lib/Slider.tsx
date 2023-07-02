import React, { Component, CSSProperties } from 'react';
import { IProps as P, PointerValue, } from "./Types";
import { tween, inertia, ColdSubscription, listen, pointer, value, calc, ValueReaction, easing } from "popmotion";
import { CarouselContext } from "./CarouselContext";
// import styler, { Styler } from "stylefire";
// import sync, { cancelSync } from "framesync";
import { cn } from "./Utility";
import { ss } from "./Styles";


export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Props to the slider tray
     */
    trayProps?: React.HTMLAttributes<HTMLDivElement>;

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

    // this tells whether slider has slided from mouse event
    public sliderDidSlided = false;

    constructor(prop: IProps) {
        super(prop);


    }

    /**
     * On scrolling from any action (touchpad, mouse drag, button)
     * @param evt 
     */
    onScroll = (evt: Event) => {
        // console.log("onScroll", evt);
        let state = this.getTrayState();

        if (state) {
            let trayWidth = state.trayWidth;
            let innerTrayWidth = state.innerTrayWidth;
            let slideWidth = state.slideWidth;
            let scrollLeft = state.scrollLeft;
            let currentSlide = this.context.currentSlide;

            // update subscriber
            for (let i = 0; i < this.context.subscribers.length; ++i) {
                this.context.subscribers[i](innerTrayWidth, slideWidth, scrollLeft);
            }

            // console.log("scroll", trayElement.scrollLeft);

            // update slide index
            this.updateSlideIndex(state);

            if (this.context.onSlide) {
                this.context.onSlide({
                    scrollLeft,
                    currentSlide,
                    slideWidth,
                    trayWidth,
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
            let prepare = () => {
                // will be called only when there is sliding

                // need to remove scroll-snap so can use mouse to move slide
                !this.context.freeScroll && trayElement.classList.remove(...ss("scroll-snap"));
            };
            // let scrollValueStartUpdate = false;

            this.sliderDidSlided = false;
            this.scrollValue = value(startPoint, (newValue: number) => {
                // if (!scrollValueStartUpdate) {
                //     scrollValueStartUpdate = true;
                //     return;
                // }

                // value got updated, and then
                // update style
                // console.log(a);
                // console.log("update:", newValue, "start point:", startPoint);

                if (this.sliderDidSlided)
                    trayElement.scrollTo(newValue, 0);
            });


            // let pointerStartUpdate = false;

            // pointer already tracking mouse movement
            this.pointerAction = pointer({
                x: 0,
                y: 0,
            }).pipe((next: PointerValue) => {
                let x = newStartPoint - next.x;

                // detect whether user slide the slider
                if (next.x != 0 && !this.sliderDidSlided) {
                    this.sliderDidSlided = true;
                    prepare();
                }

                if (x < 0) {
                    newStartPoint = next.x;
                    return { x: 0, y: next.y };
                }
                else if (x > scrollMax) {
                    newStartPoint = scrollMax + next.x;
                    return { x: scrollMax, y: next.y };
                }

                return { x: x, y: next.y };
            }).start({
                update: (a: PointerValue) => {
                    // if (!pointerStartUpdate) {
                    //     pointerStartUpdate = true;
                    //     return;
                    // }

                    // console.log("pointer", a);
                    this.scrollValue.update(a.x);
                },
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
            let velocityMin = this.context.inertiaStopSpeed;
            let onComplete = () => {
                // console.log("complete tracking!!");
                this.snapAction = undefined;
                !this.context.freeScroll && trayElement.classList.add(...ss("scroll-snap"));
            };
            let snap = (from: number, to: number) => tween({
                from: from,
                to: to,
                duration: 300,
                ease: this.getEase(),
            }).start({
                update: (a: number) => this.scrollValue.update(a),
                complete: onComplete
            });

            this.mouseUpAction?.stop();
            this.pointerAction.stop();
            this.pointerAction = undefined;

            // console.log("stop tracking, scroll from:", fromValue, "vel:", velocity, "evt", evt);

            if (velocity === 0) {
                // not scrolling fast enough
                // snap to target if not free scroll
                if (!this.context.freeScroll) {
                    let targetScrollValue = this.getSnapScrollValue(fromValue as number, velocity);

                    // console.log("stop tracking, snap:", fromValue, targetScrollValue);

                    if (Math.abs(fromValue as number - targetScrollValue) > 0.5) {
                        // need to snap
                        this.snapAction = snap(fromValue as number, targetScrollValue);
                    }
                    else {
                        // not snap, complete
                        onComplete();
                    }
                }

                return;
            }

            let inertiaStartUpdate = false;
            let inertiaAction = inertia({
                from: fromValue,
                velocity: velocity,

                // stiffness of the spring
                // bounceStiffness: 500,

                // spring oscillation lv
                // bounceDamping: 30,

                // How heavy the object: 
                // hard, closed target 0 - 1 light, further target
                // default 0.4
                power: this.context.inertiaPower,

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
                        if (!inertiaStartUpdate) {
                            inertiaStartUpdate = true;
                            return;
                        }

                        let vel = this.scrollValue.getVelocity();

                        // console.log("inertia update, vel", vel);

                        this.scrollValue.update(v);

                        if (Math.abs(vel) < velocityMin) {
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
     * Get some current state data of tray element
     * @returns 
     */
    getTrayState() {
        if (this.sliderTrayRef.current) {
            let trayElement = this.sliderTrayRef.current;
            let scrollLeft = trayElement.scrollLeft;
            let trayWidth = trayElement.offsetWidth;
            let trayPaddingX = Number(window.getComputedStyle(trayElement).paddingLeft.replace("px", ""));   // in px
            let innerTrayWidth = this.context.trayPadding == null
                ? trayWidth
                : trayWidth - 2 * trayPaddingX;
            let slideWidth = innerTrayWidth / this.context.visibleSlides;
            let slideCount = trayElement.childElementCount;

            //  current slide index (the slide on the left side)
            let currentSlide = Math.round(scrollLeft / slideWidth);

            // console.log("tray w", trayWidth, "padding", trayPaddingX, "slide w", slideWidth);

            return { trayElement, scrollLeft, trayWidth, innerTrayWidth, trayPaddingX, slideWidth, slideCount, currentSlide };
        }
    }

    /**
     * Update slide index if necessary
     * 
     * @param state 
     */
    updateSlideIndex(state = this.getTrayState()) {
        if (state) {
            let newSlideIndex = state.currentSlide;

            // console.log("temp", this.tempCurrentSlide, "new index", newSlideIndex);
            if (this.tempCurrentSlide !== newSlideIndex) {
                this.tempCurrentSlide = newSlideIndex;
                // console.log("update context slide index:", this.tempCurrentSlide);
                this.context.updateContext({ currentSlide: this.tempCurrentSlide });
            }
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
        let state = this.getTrayState();
        if (state) {
            this.stopAnimeActions();
            let trayElement = state.trayElement;
            let startPoint = state.scrollLeft;
            let slideWidth = state.slideWidth;
            // let maxSlide = this.context.totalSlides - this.context.visibleSlides;
            // let tempCurrentSlide = 0;
            let onComplete = () => {
                // console.log("complete slide to!!");
                this.snapAction = undefined;

                !this.context.freeScroll && trayElement.classList.add(...ss("scroll-snap"));
            };

            let targetScrollValue = slideIndex * slideWidth;

            !this.context.freeScroll && trayElement.classList.remove(...ss("scroll-snap"));

            // console.log("slide to target:", targetScrollValue, state);

            this.snapAction = tween({
                from: startPoint,
                to: targetScrollValue,
                duration: animated ? 300 : 0,
                ease: this.getEase(),
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
        let state = this.getTrayState();
        if (state) {
            let max = state.slideWidth * (state.slideCount - this.context.visibleSlides);

            return max;
        }
        return 0;
    }

    /**
     * Get a snap point when the free scrolling is done base on current value and direction
     * 
     * @param currentScrollValue 
     * @param velocity >0 is scrolling down, <0 is up, =0 unknown 
     */
    getSnapScrollValue(currentScrollValue: number, velocity: number) {
        let targetScrollValue = currentScrollValue;
        let state = this.getTrayState();

        if (state) {
            let slideWidth = state.slideWidth;
            let slideCount = state.slideCount;
            let targetSlideNo = 0;

            if (velocity > 0) {
                targetSlideNo = Math.ceil(currentScrollValue / slideWidth);
            }
            else if (velocity < 0) {
                targetSlideNo = Math.floor(currentScrollValue / slideWidth);
            }
            else {
                targetSlideNo = Math.round(currentScrollValue / slideWidth);
            }

            if (targetSlideNo <= slideCount) {
                targetScrollValue = targetSlideNo * slideWidth;
            }
        }

        // console.log("snap to target:", targetScrollValue, state);

        return targetScrollValue;
    }

    /**
     * Get easing function
     * 
     * @returns default is easeOut
     */
    getEase() {
        if (this.context.snapAnimation) {
            if (typeof this.context.snapAnimation === "string") {
                if (this.context.snapAnimation === "easeInOut")
                    return easing.easeInOut;

                if (this.context.snapAnimation === "easeIn")
                    return easing.easeIn;
            }
            else {
                return easing.cubicBezier(...this.context.snapAnimation);
            }
        }

        return easing.easeOut;
    }

    // can't do event stop from mouseup event
    // need to do on click capture
    // will be called on nontouch devices scroll or click,
    // or touch on touch devices, but not scroll
    handleOnClickCapture(ev: React.MouseEvent<HTMLDivElement>) {
        // if has slided, stop event propagation
        if (this.sliderDidSlided) {
            // console.log('click capture prevent!!!');
            ev.preventDefault();        // need to prevent link
            ev.stopPropagation();       // need to prevent button
        }
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

        if (this.context.slideMargin) {
            trayStyle.marginLeft = "-" + this.context.slideMargin;
            trayStyle.marginRight = "-" + this.context.slideMargin;
        }

        if (this.context.trayPadding != null) {
            trayStyle.paddingLeft = this.context.trayPadding;
            trayStyle.paddingRight = this.context.trayPadding;
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
                    onClickCapture={this.handleOnClickCapture.bind(this)}
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
