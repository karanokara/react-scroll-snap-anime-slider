import React, { Component } from 'react';
import { SliderProps as IProps } from "../types";

interface IState {
}

export default class Slider extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    render() {
        return <div>slider</div>;
    }
}