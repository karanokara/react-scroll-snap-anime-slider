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
}

export interface IProps extends P {
    dotGroupProps?: React.HTMLAttributes<HTMLDivElement>;

    /**
     * To customize the dot group rendering by using the state props passed in
     * 
     * @returns 
     */
    renderDots?: (props: IRenderDotsProps) => JSX.Element;
}

export interface IState extends S {
}

export class SliderDotGroup extends SliderBar<IProps, IState> {

    theDot(key: number, active: boolean, scalePercent?: number) {
        return (
            <div key={key} className={cn("slider-dot", active ? "active" : "")}></div>
        );
    }

    theDotDynamic(key: number, scale?: number) {
        return (
            <div key={key} className={cn("slider-dot", "dynamic")} style={{ transform: `scale(${scale})` }} ></div>
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

    /**
     * Dynamic dot rendering base on scrolling %
     * @param props 
     * @returns 
     */
    renderDotsDynamic(props: IRenderDotsProps) {
        let {
            visibleSlides,
            totalSlides,
            step,
            left,
            currentSlide,
        } = props;

        let dots: JSX.Element[] = [];
        let rangePercent = round3(visibleSlides / totalSlides);
        let startPercent = round3(left / 100);
        let endPercent = startPercent + rangePercent;
        let slideRangePercent = round3(1 / totalSlides);

        for (let i = 0; i < totalSlides; ++i) {
            let slideStartPercent = round3(i / totalSlides);
            let slideEndPercent = round3(slideStartPercent + slideRangePercent);
            let scale = 1;

            // console.log(startPercent, endPercent, slideStartPercent, slideEndPercent);
            if (slideStartPercent <= startPercent && startPercent <= slideEndPercent) {
                let addPercent = slideEndPercent - startPercent;
                scale += (addPercent / slideRangePercent);
            }
            else if (startPercent <= slideStartPercent && slideEndPercent <= endPercent) {
                scale = 2;
            }
            else if (slideStartPercent <= endPercent && endPercent <= slideEndPercent) {
                let addPercent = endPercent - slideStartPercent;
                scale += (addPercent / slideRangePercent);
            }

            dots.push(this.theDotDynamic(i, scale));
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
                        : this.renderDotsDynamic(renderDotsProps)}
                </div>
            </div>
        );
    }
}

