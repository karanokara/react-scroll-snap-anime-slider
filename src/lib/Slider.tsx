import React, { Component } from 'react';
import { IProps as P } from "../types";
import anime from "animejs";

export interface IProps extends P {
    className?: string,
    children?: React.ReactNode;
}

interface IState {
}

export class Slider extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    onScroll = (e: React.UIEvent<HTMLDivElement>) => {

    };

    setAnime() {
        console.log(anime.version);

    }

    render() {
        return <div
            onScroll={this.onScroll}
        >slider</div>;
    }
}