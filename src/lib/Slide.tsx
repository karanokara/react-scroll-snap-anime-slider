import React, { Component } from 'react';
import { IProps as P } from "../types";

export interface IProps extends P {

}

interface IState {
}

export class Slide extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    render() {
        return <div>slide</div>;
    }
}