import React, { Component } from 'react';
import { ISliderShareProps as P } from "./Types";
import { SliderContext, DefaultSliderShareProps } from "./SliderContext";

export interface IProps extends P {

}

interface IState {
}

export class Slide extends Component<IProps, IState> {

    public static defaultProps: Pick<IProps,
        keyof (typeof DefaultSliderShareProps)>
        = {
            ...DefaultSliderShareProps,
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
