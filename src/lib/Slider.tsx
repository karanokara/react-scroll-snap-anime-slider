import React, { Component, useRef } from 'react';
import { IProps as P, TweenStartedAction } from "../types";
import { tween, inertia, ColdSubscription } from "popmotion";
import '../css/Slider.css';



export interface IProps extends P {
    className?: string,
    children?: React.ReactNode;
}

interface IState {
}

export class Slider extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    onScroll = (e: React.UIEvent<HTMLDivElement>) => {

    };

    setAnime() {
        // console.log(anime.version);
        var tweenAction = tween({

        }).start() as TweenStartedAction;


    }

    render() {
        return <div
            onScroll={this.onScroll}
        >slider</div>;
    }
}

const Slider2 = () => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleLeftArrowClick = () => {
        sliderRef.current?.scrollBy({
            left: -sliderRef.current.offsetWidth,
            behavior: 'smooth',
        });
    };

    const handleRightArrowClick = () => {
        sliderRef.current?.scrollBy({
            left: sliderRef.current.offsetWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className="slider-container" ref={sliderRef}>
            <div className="slider-item">
                <img src="slider-item-1.jpg" alt="Slider item 1" />
            </div>
            <div className="slider-item">
                <img src="slider-item-2.jpg" alt="Slider item 2" />
            </div>
            <div className="slider-item">
                <img src="slider-item-3.jpg" alt="Slider item 3" />
            </div>
            <button className="slider-button slider-left-button" onClick={handleLeftArrowClick}>
                &lt;
            </button>
            <button className="slider-button slider-right-button" onClick={handleRightArrowClick}>
                &gt;
            </button>
        </div>
    );
};

export default Slider;
