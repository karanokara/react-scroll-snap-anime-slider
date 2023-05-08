import React from "react";
import { CarouselContext, DefaultCarouselContextProps, ICarouselContextProps } from "./CarouselContext";
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn } from "./Utility";

export interface IProps extends P, DP {
    /**
     * Total slides in this slider
     */
    totalSlides: number;


}

export interface IState {
    context: ICarouselContextProps;
}

export class Carousel extends React.Component<IProps, IState> {

    // pick only default props
    // and fill with default props
    // this static var is used to fill undefined props
    public static defaultProps: DP // Pick<IProps, keyof (P)>
        = {
            ...DefaultCarouselContextProps,
        };

    constructor(props: IProps) {
        super(props);

        const {
            className,
            style,
            children,
            ...contextProps
        } = this.props;

        // validate the step
        contextProps.step = this.props.step > 0
            ? (this.props.step < this.props.visibleSlides
                ? this.props.step
                : this.props.visibleSlides)
            : 1;

        this.state = {
            context: {
                ...contextProps,
                updateContext: this.updateContext
            }
        };
    }

    /**
     * Update the context props and re-render to pass the new context
     * @param state 
     */
    updateContext = <K extends keyof ICarouselContextProps>(state: ICarouselContextProps | Pick<ICarouselContextProps, K> | null) => {
        this.setState({
            context: {
                ...this.state.context,
                ...state,
            }
        });
    };

    render() {
        const {
            className,
            style,
        } = this.props;


        return (
            <div
                className={cn("react-scroll-snap-anime-slider", className)}
                style={style}
            >
                <CarouselContext.Provider
                    value={{
                        ...this.state.context,
                    }}
                >
                    {this.props.children}
                </CarouselContext.Provider>
            </div>
        );
    }
};
