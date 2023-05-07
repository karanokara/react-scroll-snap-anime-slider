import React, { Component } from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";

export interface IProps extends P {

}

export interface IState {
}

export class SlideBar extends Component<IProps, IState> {

    public context!: React.ContextType<typeof CarouselContext>;

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };

        // console.log("slide context:", this.context); // undefined when construct
    }

    render() {
        let {
            slideHeight,
            slideWidth,
            visibleSlides
        } = this.context;

        let width = 0;
        let style: React.CSSProperties = {
            width: width + "%",
        };

        return (
            <div
                className="slider-bar"
                style={style}
            >
                <div className="slider-bar-track">
                    <div className="slider-bar-thumb"></div>
                </div>
            </div>
        );
    }
}

SlideBar.contextType = CarouselContext;
