import React, { ButtonHTMLAttributes } from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, } from "./CarouselContext";
import { ss } from "./Styles";

export interface IProps extends P, ButtonHTMLAttributes<HTMLButtonElement> {
}

export interface IState {
}

export default class SliderButton<PP extends IProps, SS extends IState> extends React.PureComponent<PP, SS> {

    public context!: React.ContextType<typeof CarouselContext>;

    public className = "slider-button";
    public ariaLabel = "";
    public isBack = true;   // is back btn

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

        // console.log("current", currentSlide, "next", nextSlide);
        if (currentSlide === nextSlide)
            return;

        // this.context.updateContext({ currentSlide: nextSlide });
        this.context.slideTo(nextSlide);
    };

    render() {
        const {
            visibleSlides,
            totalSlides,
            currentSlide,
        } = this.context;
        let {
            className,
            disabled,
            onClick,
            ...otherProps
        } = this.props;

        const newClassName = cn(this.className, className);
        const maxSlide = totalSlides - visibleSlides;

        if (disabled == null) {
            if ((this.isBack && currentSlide <= 0)
                || (!this.isBack && currentSlide >= maxSlide)
            ) {
                disabled = true;
            }
        }

        return (
            <button
                aria-label={this.ariaLabel}
                type="button"
                disabled={disabled}
                {...otherProps}
                className={newClassName}
                onClick={(e) => {
                    if (onClick && typeof onClick === "function") {
                        onClick(e);
                    }

                    this.onClick();
                }}
            >
                {this.props.children}
            </button>
        );
    }
};

SliderButton.contextType = CarouselContext;
