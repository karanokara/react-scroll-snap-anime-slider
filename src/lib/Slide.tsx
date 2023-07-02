import React, { Component } from 'react';
import { IDefaultCarouselProps as DP, IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";
import { ss } from "./Styles";

export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {
    innerMarginDivProps?: React.HTMLAttributes<HTMLDivElement>;
    innerPaddingDivProps?: React.HTMLAttributes<HTMLDivElement>;
    innerWrapperDivProps?: React.HTMLAttributes<HTMLDivElement>;

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
            innerMarginDivProps,
            innerPaddingDivProps,
            innerWrapperDivProps,
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

            // if having offset and visible slides count is even, 
            // then need to add scroll margin to adjust alignment
            scrollMargin: (this.context.trayPadding != null && (this.context.visibleSlides % 2 === 0))
                ? `0 ${this.context.trayPadding}`
                : "",

            ...style,
        };
        let innerPaddingStyle: React.CSSProperties = {
            paddingBottom: paddingBottomPercent > 0 ? paddingBottomPercent + "%" : "",
            ...innerPaddingDivProps?.style
        };

        let innerMarginStyle: React.CSSProperties = { ...innerMarginDivProps?.style };
        if (this.context.slideMargin != null) {
            innerMarginStyle.marginLeft = this.context.slideMargin;
            innerMarginStyle.marginRight = this.context.slideMargin;
        }

        let innerWrapperClass = paddingBottomPercent > 0 ? ss("fixed-size") : "";

        return (
            <div
                {...otherProps}
                className={cn(
                    ss("slide"),

                    // if having offset and visible slides count is odd, then need to align center
                    (this.context.trayPadding != null &&
                        (this.context.visibleSlides % 2 === 1) &&
                        ss("align-center")),

                    className)
                }
                style={slideStyle}
            >
                <div
                    {...innerMarginDivProps}
                    className={cn(ss("slide-inner-margin"))}
                    style={innerMarginStyle}
                >
                    <div
                        {...innerPaddingDivProps}
                        className={cn(ss("slide-inner-padding"))}
                        style={innerPaddingStyle}
                    >
                        <div
                            {...innerWrapperDivProps}
                            className={cn(ss("slide-inner-wrapper"), innerWrapperClass, innerWrapperDivProps?.className)}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Slide.contextType = CarouselContext;
