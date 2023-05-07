import React from "react";
import { SliderContext, DefaultSliderContextProps } from "./SliderContext";
import { ICarouselDefaultProps as P, } from "./Types";
import { cn } from "./Utility";

export interface IProps extends P {
    /**
     * Total slides in this slider
     */
    totalSlides: number;


}

export interface IState {
}

export class Carousel extends React.Component<IProps, IState> {

    // fill with default props
    public static defaultProps: Pick<IProps,
        keyof (P) | "currentSlide">
        = {
            ...DefaultSliderContextProps,
            currentSlide: 0,
        };

    constructor(props: IProps) {
        super(props);

    }

    render() {
        const {
            slideHeight,
            slideWidth,
            visibleSlides,
            slidesPerStep,
            className,
            currentSlide,
        } = this.props;

        return (
            <div
                className={cn("react-scroll-snap-anime-slider", className)}
                style={this.props.style}
            >
                <SliderContext.Provider
                    value={{
                        ...DefaultSliderContextProps,
                        slideHeight,
                        slideWidth,
                        visibleSlides,
                        slidesPerStep,
                        currentSlide,
                    }}
                >
                    {this.props.children}
                </SliderContext.Provider>
            </div>
        );

    }
};
