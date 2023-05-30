import React, { Component } from 'react';
import { ICarouselDefaultProps as DP, IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";
import { ss } from "./Styles";

export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {

}

export interface IState {
}

export class Slide extends Component<IProps, IState> {

    // passing props from slider to each slide
    // public static defaultProps: DP // Pick<IProps,keyof (P)>
    //     = {
    //         ...DefaultCarouselContextProps,
    //     };

    public context!: React.ContextType<typeof CarouselContext>;

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };

        // console.log("slide context:", this.context); // undefined when construct
    }

    render() {
        let {
            children,
            style,
            className,
            ...otherProps
        } = this.props;
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
            ...style,
        };
        let innerPaddingStyle: React.CSSProperties = {
            paddingBottom: paddingBottomPercent > 0 ? paddingBottomPercent + "%" : "",
        };

        let innerMarginStyle: React.CSSProperties = {};
        if (this.context.margin) {
            innerMarginStyle.marginLeft = this.context.margin;
            innerMarginStyle.marginRight = this.context.margin;
        }

        let innerWrapperClass = paddingBottomPercent > 0 ? ss("fixed-size") : "";

        return (
            <div
                {...otherProps}
                className={cn(ss("slide"), className)}
                style={slideStyle}
            >
                <div
                    className={cn(ss("slide-inner-margin"))}
                    style={innerMarginStyle}
                >
                    <div className={cn(ss("slide-inner-padding"))}
                        style={innerPaddingStyle}
                    >
                        <div className={cn(ss("slide-inner-wrapper"), innerWrapperClass)}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Slide.contextType = CarouselContext;
