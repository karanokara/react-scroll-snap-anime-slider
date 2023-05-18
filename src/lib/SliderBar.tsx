import React, { Component } from 'react';
import { IProps as P } from "./Types";
import { CarouselContext } from "./CarouselContext";

export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {
}

export interface IState {
    left: number;
}

export default class SliderBar<P extends IProps, S extends IState> extends Component<P, S> {

    public context!: React.ContextType<typeof CarouselContext>;
    public prevContext!: React.ContextType<typeof CarouselContext>;

    constructor(prop: P) {
        super(prop);

        this.state = {
            left: 0,
        } as S;

        // console.log("slide context:", this.context); // undefined when construct
    }

    onScroll = (trayWidth: number, slideWidth: number, scrollLeft: number) => {
        const {
            totalSlides
        } = this.context;
        const totalWidth = totalSlides * slideWidth;
        const per = scrollLeft / totalWidth * 100;

        this.setState({ left: per });
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.prevContext !== this.context) {
            // subscribe to onScroll change
            this.context.subscribers.push(this.onScroll);
            this.prevContext = this.context;
        }
    }

    componentDidMount(): void {
        const {
            currentSlide,
            visibleSlides,
            totalSlides,
        } = this.context;


        // subscribe to onScroll change
        this.context.subscribers.push(this.onScroll);
        this.prevContext = this.context;

        if (currentSlide !== 0) {
            let left = currentSlide / totalSlides * 100;
            this.setState({ left: left });
        }
    }

}

SliderBar.contextType = CarouselContext;
