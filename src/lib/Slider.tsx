import React, { Component } from 'react';
import { SliderProps as IProps } from "../types";
import anime from "animejs";

interface IState {
}

export class Slider extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);

        this.state = {

        };
    }

    setAnime() {
        console.log(anime.version);

    }

    render() {
        return <div>slider</div>;
    }
}