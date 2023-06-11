import React, { Component } from 'react';
import { cn, round3 } from "./Utility";
import SliderBar, { IProps as P, IState as S } from "./SliderBar";
import { ss } from "./Styles";


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

export class SliderBarDotGroup extends SliderBar<IProps, IState> {

    theDot(key: number, active: boolean, onClick: () => void) {
        return (
            <div className={cn(ss("slider-dot-wrapper"), active ? ss("active") : "")} onClick={onClick}>
                <div key={key} className={cn(ss("slider-dot"))} ></div>
            </div>
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
            slideTo,
        } = props;

        let dots: JSX.Element[] = [];
        let startIndex = currentSlide;
        let endIndex = currentSlide + visibleSlides;

        for (let i = 0; i < totalSlides; ++i) {
            let active = startIndex <= i && i < endIndex;
            dots.push(this.theDot(i, active, () => slideTo(i)));
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
            children,
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

        const newClassName = cn(ss("slider-bar"), className);

        return (
            <div
                {...otherProps}
                className={newClassName}
            >
                <div
                    {...dotGroupProps}
                    className={cn(ss("slider-bar-dot-group"), dotGroupProps?.className)}
                >
                    {renderDots
                        ? renderDots(renderDotsProps)
                        : this.renderDots(renderDotsProps)}
                </div>
            </div>
        );
    }
}

