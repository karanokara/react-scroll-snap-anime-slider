import React from 'react';
import { IRenderDotsProps } from "./SliderBarDotGroup";
import { cn, round3 } from "./Utility";
import { ss } from "./Styles";

export type ScaleDotProps = { scale: number; onClick: () => void; };
export type ScaleDot = (props: ScaleDotProps) => JSX.Element;


/**
 * Render dots dynamically in different scalings
 * 
 * @param props 
 * @param SD 
 * @returns 
 */
export function renderDotsDynamicByScale(props: IRenderDotsProps, SD: ScaleDot) {
    let {
        visibleSlides,
        totalSlides,
        step,
        left,
        currentSlide,
        slideTo,
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

        dots.push(
            <SD
                key={i}
                scale={scale}
                onClick={() => {
                    slideTo(i);
                }}
            />
        );
    }
    return dots;
}

export function CircleDot(props: ScaleDotProps) {
    return (
        <div className={cn(ss("slider-dot"), ss("dynamic"), ss("circle"))} style={{ transform: `scale(${props.scale})` }} onClick={props.onClick} ></div>
    );
}

/**
 * Dynamic circle dot change scaling base on scrolling %
 * 
 * @param props 
 * @returns 
 */
export function renderDotsDynamicCircle(props: IRenderDotsProps) {
    return renderDotsDynamicByScale(props, CircleDot);
}

export function PillDot(props: ScaleDotProps) {
    let size = 8;   // 8px
    return (
        <div className={cn(ss("slider-dot"), ss("dynamic"), ss("circle"))} style={{ width: `${props.scale * size}px`, height: `${size}px` }} onClick={props.onClick} ></div>
    );
}

/**
 * Dynamic circle dot change scaling base on scrolling %
 * 
 * @param props 
 * @returns 
 */
export function renderDotsDynamicPill(props: IRenderDotsProps) {
    return renderDotsDynamicByScale(props, PillDot);
}

