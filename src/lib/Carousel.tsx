import React from "react";
import { CarouselContext, DefaultCarouselProps, ICarouselContextProps } from "./CarouselContext";
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn, deepCompare } from "./Utility";

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
            ...DefaultCarouselProps,
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
        contextProps.step = this.validateStep();

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

    validateStep() {
        return this.props.step > 0
            ? (this.props.step < this.props.visibleSlides
                ? this.props.step
                : this.props.visibleSlides)
            : 1;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        const {
            className,
            style,
            children,
            ...contextPrevProps
        } = prevProps;

        const {
            className: a,
            style: b,
            children: c,
            ...contextProps
        } = this.props;

        if (!deepCompare(contextPrevProps, contextProps)) {
            this.setState({
                context: {
                    ...contextProps,
                    updateContext: this.updateContext
                }
            });
        }
    }

    render() {
        const {
            className,
            style,
            children,
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
                    {children}
                </CarouselContext.Provider>
            </div>
        );
    }
};
