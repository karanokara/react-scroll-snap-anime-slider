import React, { Component } from 'react';
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";

export interface IProps extends DP, P {

}

export interface IState {
}

export class Slide extends Component<IProps, IState> {

    // passing props from slider to each slide
    public static defaultProps: DP // Pick<IProps,keyof (P)>
        = {
            ...DefaultCarouselContextProps,
        };

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
        let widthPercent = visibleSlides > 0
            ? (100 / visibleSlides)
            : 100;
        let paddingBottomPercent = (slideHeight > 0 && slideWidth > 0)
            ? slideHeight / slideWidth * 100
            : 0;
        let slideStyle: React.CSSProperties = {
            width: widthPercent + "%",
            ...this.props.style,
        };
        let innerSlideStyle: React.CSSProperties = {
            paddingBottom: paddingBottomPercent > 0 ? paddingBottomPercent + "%" : "",
        };
        let innerInnerClass = paddingBottomPercent > 0 ? "fixed-size" : "";

        return (
            <div
                className="slide"
                style={slideStyle}
            >
                <div
                    className="slide-inner"
                    style={innerSlideStyle}
                >
                    <div className={cn("slide-inner-inner", innerInnerClass)}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Slide.contextType = CarouselContext;
