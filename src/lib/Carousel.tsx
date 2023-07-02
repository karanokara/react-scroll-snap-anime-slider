import React from "react";
import { CarouselContext, DefaultCarouselContextProps, DefaultCarouselProps, ICarouselContextProps, ICarouselProps } from "./CarouselContext";
import { IDefaultCarouselProps as DP, IProps as P } from "./Types";
import { cn, deepCompare } from "./Utility";
import { ss } from "./Styles";

export interface IProps extends P, ICarouselProps, React.HTMLAttributes<HTMLDivElement> {

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

        // const {
        //     id,
        //     className,
        //     style,
        //     children,
        //     ...contextProps
        // } = this.props;

        this.state = {
            context: this.extractContextProps(this.props),
        };
    }

    /**
     * Extract context props from IProps
     * 
     * @param props 
     * @returns 
     */
    extractContextProps(props: IProps) {
        let contextProps = Object.assign({}, DefaultCarouselContextProps);
        let key: keyof ICarouselContextProps;

        for (key in contextProps) {
            if ((props as any)[key] != null) {
                contextProps[key] = (this.props as any)[key] as never;
            }
        }

        // validate the step
        contextProps.step = this.validateStep(props);
        contextProps.updateContext = this.updateContext;

        // optional props
        contextProps.onSlide = props.onSlide;
        contextProps.slideMargin = props.slideMargin;
        contextProps.snapAnimation = props.snapAnimation;
        contextProps.trayPadding = props.trayPadding;

        return contextProps;
    }

    compareContextProps(prevProps: IProps, currentProps: IProps) {
        let keys: (keyof ICarouselContextProps)[] = [
            "freeScroll",
            "inertiaPower",
            "onSlide",
            "slideHeight",
            "slideMargin",
            "slideWidth",
            "snapAnimation",
            "step",
            "totalSlides",
            "trayPadding",
            "visibleSlides"
        ];

        for (let key of keys) {
            if ((prevProps as any)[key] !== (currentProps as any)[key]) {
                console.log("context updated key:", key);
                return false;
            }
        }

        return true;
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

    validateStep(props: IProps) {
        return props.step > 0
            ? (props.step < props.visibleSlides
                ? props.step
                : props.visibleSlides)
            : 1;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        // const {
        //     id,
        //     className,
        //     style,
        //     children,
        //     ...contextPrevProps
        // } = prevProps;

        // const {
        //     id: i,
        //     className: a,
        //     style: b,
        //     children: c,
        //     ...contextProps
        // } = this.props;

        // if (!deepCompare(contextPrevProps, contextProps)) {
        //     // validate the step
        //     contextProps.step = this.validateStep(this.props);
        //     this.setState({
        //         context: {
        //             ...contextProps,
        //             updateContext: this.updateContext,
        //             subscribers: [],
        //             slideTo: () => { },
        //         }
        //     });
        // }

        if (!this.compareContextProps(prevProps, this.props)) {
            this.setState({
                context: this.extractContextProps(this.props),
            });
        }
    }

    render() {
        const {
            className,
            children,

            // props used for context
            currentSlide,
            freeScroll,
            inertiaPower,
            slideHeight,
            slideWidth,
            step,
            totalSlides,
            visibleSlides,
            slideMargin,
            onSlide,
            trayPadding,

            ...divProps
        } = this.props;


        return (
            <div
                {...divProps}
                className={cn(ss("wrapper"), className)}
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
