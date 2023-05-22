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

    /**
     * Slide to a specific slide by index
     * 
     * @param nextSlide 
     */
    slideTo = (nextSlide: number) => {
        let currentSlide = this.context.currentSlide;
        let maxSlide = this.context.totalSlides - this.context.visibleSlides;

        if (nextSlide > maxSlide) {
            nextSlide = maxSlide;
        }
        else if (nextSlide < 0) {
            nextSlide = 0;
        }

        // console.log("current", currentSlide, "next", nextSlide);
        if (currentSlide === nextSlide)
            return;

        // this.context.updateContext({ currentSlide: nextSlide });
        this.context.slideTo(nextSlide);
    };

    onScroll = (trayWidth: number, slideWidth: number, scrollLeft: number) => {
        const {
            totalSlides
        } = this.context;
        const totalWidth = totalSlides * slideWidth;
        const per = scrollLeft / totalWidth * 100;

        this.setState({ left: per });
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.prevContext.subscribers !== this.context.subscribers) {
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

    componentWillUnmount(): void {
        // unsubscribe
        let i = this.context.subscribers.indexOf(this.onScroll);
        if (i >= 0) this.context.subscribers.splice(i, 1);
    }


}

SliderBar.contextType = CarouselContext;
