import React, { Component } from 'react';
import { SlideProps as IProps } from "../types";

interface IState {
}

export default class Slide extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    render() {
        return <div>slide</div>;
    }
}