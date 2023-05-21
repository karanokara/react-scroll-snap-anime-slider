import React, { Component } from 'react';
import { cn, round3 } from "./Utility";
import SliderBar, { IProps as P, IState as S } from "./SliderBar";


export interface IRenderDotsProps {
    /**
     * Total slides in this slider
     */
    totalSlides: number;

    /**
     * Current slide index (from 0)
     * 
     */
    currentSlide: number;

    /**
     * How many visible slides (N), slide width = 100% / N
     */
    visibleSlides: number;

    /**
     * How mange slides per step (when click previous and next button) 
     */
    step: number;

    /**
     * How far has scrolled in %, range in [0 ~ (100 - % of visible slides)]
     */
    left: number;

    /**
     * A function to call to slide to a target slide [from 0 ~ (length - visible slide - 1)]
     * @param slideIndex 
     * @returns 
     */
    slideTo: (slideIndex: number) => void;
}

export interface IProps extends P {
    dotGroupProps?: React.HTMLAttributes<HTMLDivElement>;

    /**
     * To customize the dot group rendering by using the state props passed in
     * 
     * @returns 
     */
    renderDots?: (props: IRenderDotsProps) => JSX.Element | JSX.Element[];

}

export interface IState extends S {
}

export class SliderDotGroup extends SliderBar<IProps, IState> {

    theDot(key: number, active: boolean) {
        return (
            <div key={key} className={cn("slider-dot", active ? "active" : "")}></div>
        );
    }

    /**
     * Simple dot rendering, add "active" ClassName to those active dots 
     * 
     * @param props 
     * @returns 
     */
    renderDots(props: IRenderDotsProps) {
        let {
            visibleSlides,
            totalSlides,
            currentSlide,
        } = props;

        let dots: JSX.Element[] = [];
        let startIndex = currentSlide;
        let endIndex = currentSlide + visibleSlides;

        for (let i = 0; i < totalSlides; ++i) {
            dots.push(this.theDot(i, (startIndex <= i && i < endIndex)));
        }
        return dots;
    }

    render() {
        const {
            visibleSlides,
            totalSlides,
            step,
            currentSlide,
        } = this.context;
        const {
            className,
            dotGroupProps,
            renderDots,
            ...otherProps
        } = this.props;
        let renderDotsProps = {
            visibleSlides,
            totalSlides,
            step,
            currentSlide,
            left: this.state.left,
            slideTo: this.slideTo,
        };

        const newClassName = cn("slider-bar", className);

        return (
            <div
                {...otherProps}
                className={newClassName}
            >
                <div
                    {...dotGroupProps}
                    className={cn("slider-bar-dot-group", dotGroupProps?.className)}
                >
                    {renderDots
                        ? renderDots(renderDotsProps)
                        : this.renderDots(renderDotsProps)}
                </div>
            </div>
        );
    }
}

