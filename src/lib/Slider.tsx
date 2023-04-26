import React, { Component, useRef } from 'react';
import { ISliderDefaultProps as P, TweenStartedAction } from "./Types";
import { tween, inertia, ColdSubscription } from "popmotion";
import { SliderContext, DefaultSliderProps } from "./SliderContext";
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

    setAnime() {
        // console.log(anime.version);
        var tweenAction = tween({

        }).start() as TweenStartedAction;


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
