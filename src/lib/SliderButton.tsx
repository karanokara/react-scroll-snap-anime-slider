import React from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, } from "./CarouselContext";

export interface IProps extends P {
    disabled?: boolean;
}

export interface IState {
}

export default class SliderButton<PP extends IProps, SS extends IState> extends React.PureComponent<PP, SS> {

    public context!: React.ContextType<typeof CarouselContext>;

    public className = "slider-button";
    public ariaLabel = "";

    onClick = () => { };

    handleOnClick(isNext: boolean) {
        let currentSlide = this.context.currentSlide;
        let step = this.context.step;
        let maxSlide = this.context.totalSlides - this.context.visibleSlides;
        let nextSlide = currentSlide + (isNext ? step : - 1 * step);

        if (nextSlide > maxSlide) {
            nextSlide = maxSlide;
        }
        else if (nextSlide < 0) {
            nextSlide = 0;
        }

        console.log("current", currentSlide, "next", nextSlide);
        if (currentSlide === nextSlide)
            return;

        this.context.updateContext({ currentSlide: nextSlide });
    };

    render() {
        const {
            visibleSlides,
            totalSlides: slideCount,

        } = this.context;
        const {
            className,
            disabled,
            ...otherProps
        } = this.props;

        const newClassName = cn(this.className, className);

        return (
            <button
                type="button"
                aria-label={this.ariaLabel}
                className={newClassName}
                onClick={this.onClick}
                disabled={disabled}
                {...otherProps}
            >
                {this.props.children}
            </button>
        );
    }
};

SliderButton.contextType = CarouselContext;
