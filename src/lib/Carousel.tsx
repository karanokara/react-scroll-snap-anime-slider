import React from "react";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn } from "./Utility";

export interface IProps extends P, DP {
    /**
     * Total slides in this slider
     */
    totalSlides: number;


}

export interface IState {
}

export class Carousel extends React.Component<IProps, IState> {

    // pick only default props
    // and fill with default props
    // this static var is used to fill null props
    public static defaultProps: DP // Pick<IProps, keyof (P)>
        = {
            ...DefaultCarouselContextProps,
        };

    constructor(props: IProps) {
        super(props);

    }

    updateContext = () => {

    };

    render() {
        const {
            className,
            style,
            children,
            ...otherProps
        } = this.props;

        // validate the step
        otherProps.step = this.props.step > 0
            ? (this.props.step < this.props.visibleSlides
                ? this.props.step
                : this.props.visibleSlides)
            : 1;

        return (
            <div
                className={cn("react-scroll-snap-anime-slider", className)}
                style={this.props.style}
            >
                <CarouselContext.Provider
                    value={{
                        ...DefaultCarouselContextProps,
                        ...otherProps,
                    }}
                >
                    {this.props.children}
                </CarouselContext.Provider>
            </div>
        );
    }
};
