import React, { Component } from 'react';
import { ISliderDefaultProps as P } from "./Types";
import { SliderContext, DefaultSliderProps } from "./SliderContext";

export interface IProps extends P {

}

interface IState {
}

export class Slide extends Component<IProps, IState> {

    public static defaultProps: Pick<IProps,
        keyof (typeof DefaultSliderProps)>
        = {
            ...DefaultSliderProps,
        };

    // passing props from slider to each slide
    context!: React.ContextType<typeof SliderContext>;

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };

        // console.log("slide context:", this.context);     // undefined when construct
    }

    render() {

        return (
            <div className="slide">
                <div>Context: {JSON.stringify(this.context)}</div>
                {this.props.children}
            </div>
        );
    }
}

Slide.contextType = SliderContext;
