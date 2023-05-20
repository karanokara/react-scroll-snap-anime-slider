import React, { Component } from 'react';
import { IRenderDotsProps } from "./SliderBarDotGroup";
import { cn, round3 } from "./Utility";

export function CircleDot(props: { scale?: number; }) {
    return (
        <div className={cn("slider-dot", "dynamic")} style={{ transform: `scale(${props.scale})` }} ></div>
    );
}

/**
 * Dynamic circle dot change scaling base on scrolling %
 * 
 * @param props 
 * @returns 
 */
export function renderDotsDynamicCircle(props: IRenderDotsProps) {
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
        if (slideStartPercent < endPercent && slideEndPercent > startPercent) {
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
        }

        dots.push(<CircleDot key={i} scale={scale} />);
    }
    return dots;
}

export function PillDot(props: { key: number, scale?: number; }) {
    return (
        <div key={props.key} className={cn("slider-dot", "dynamic")} style={{ transform: `scale(${props.scale})` }} ></div>
    );
}

/**
 * Dynamic Pill dot changing length base on scrolling %
 * 
 * @param props 
 * @returns 
 */
export function renderDotsDynamicPill(props: IRenderDotsProps) {
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
        if (slideStartPercent < endPercent && slideEndPercent > startPercent) {
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
        }

        dots.push(<CircleDot key={i} scale={scale} />);
    }
    return dots;
}


