import React from "react";
import { CarouselContext, DefaultCarouselProps, ICarouselContextProps, ICarouselProps } from "./CarouselContext";
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn, deepCompare } from "./Utility";
import { ss } from "./Styles";

export interface IProps extends P, ICarouselProps {

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
            id,
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
                updateContext: this.updateContext,
                subscribers: [],
                slideTo: () => { },
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
            id,
            className,
            style,
            children,
            ...contextPrevProps
        } = prevProps;

        const {
            id: i,
            className: a,
            style: b,
            children: c,
            ...contextProps
        } = this.props;

        if (!deepCompare(contextPrevProps, contextProps)) {
            // validate the step
            contextProps.step = this.validateStep();
            this.setState({
                context: {
                    ...contextProps,
                    updateContext: this.updateContext,
                    subscribers: [],
                    slideTo: () => { },
                }
            });
        }
    }

    render() {
        const {
            id,
            className,
            style,
            children,
        } = this.props;


        return (
            <div
                id={id}
                className={cn(ss("wrapper"), className)}
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
