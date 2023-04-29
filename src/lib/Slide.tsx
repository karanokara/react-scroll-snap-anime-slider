import React, { Component } from 'react';
import { ISliderDefaultProps as P } from "./Types";
import { SliderContext, DefaultSliderProps } from "./SliderContext";

export interface IProps extends P {

}

interface IState {
}

export class Slide extends Component<IProps, IState> {
    // passing props from slider to each slide

    public static defaultProps: Pick<IProps,
        keyof (typeof DefaultSliderProps)>
        = {
            ...DefaultSliderProps,
        };

    public context!: React.ContextType<typeof SliderContext>;

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
        };
        let innerSlideStyle: React.CSSProperties = {
            paddingBottom: paddingBottomPercent > 0 ? paddingBottomPercent + "%" : "",
        };

        return (
            <div
                className="slide"
                style={slideStyle}
            >
                <div
                    className="slide-inner"
                    style={innerSlideStyle}
                >
                    <div className="slide-inner-inner">

                        {/* <div>Context: {JSON.stringify(this.context)}</div> */}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Slide.contextType = SliderContext;
