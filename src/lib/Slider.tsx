import React, { Component, useRef } from 'react';
import { IProps as P, TweenStartedAction } from "../types";
import { tween, inertia, ColdSubscription } from "popmotion";
import "../css/style.scss";


export interface IProps extends P {
    className?: string,
    children?: React.ReactNode;
}

interface IState {
}

export class Slider extends Component<IProps, IState> {

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
        return (
            <div className="slider" >
                <div
                    className="slider-tray css-only"
                    onScroll={this.onScroll}
                    ref={this.sliderTrayRef}
                >
                    {this.props.children}

                </div>
                <button className="slider-button slider-left-button" onClick={this.onLeftArrowClick}>
                    &lt;
                </button>
                <button className="slider-button slider-right-button" onClick={this.onRightArrowClick}>
                    &gt;
                </button>

            </div>
        );
    }
}

export default Slider;
