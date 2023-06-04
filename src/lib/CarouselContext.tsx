import React from 'react';
import { ICarouselDefaultProps } from "./Types";

export type OnSlideProps = {
    scrollLeft: number;
    currentSlide: number;
    slideWidth: number;
    trayWidth: number;
};

export interface ICarouselProps extends ICarouselDefaultProps {
    /**
     * Total slides in this slider
     */
    totalSlides: number;

    /**
     * Margin between each slide 
     * 
     * -----------------------
     * value can be any pixel value: "5px", "1rem", ...
     * 
     * The result will be double, such as "5px" => then the gap between 2 slides will be "10px"
     */
    margin?: string;

    /**
     * Offset the slider track so you can see a little bit of next hidden slide
     * 
     * -----------------------
     * value can be any pixel value: "5px", "1rem", ...
     */
    offset?: string;

    /**
     * A callback function when slider is sliding
     * 
     * @param props 
     * @returns 
     */
    onSlide?: (props: OnSlideProps) => void;
}

export interface ICarouselContextProps extends ICarouselDefaultProps, ICarouselProps {
    updateContext<K extends keyof ICarouselContextProps>(state: Pick<ICarouselContextProps, K> | ICarouselContextProps | null): void;
    subscribers: ((trayWidth: number, slideWidth: number, scrollLeft: number) => void)[];
    slideTo: (slideIndex: number) => void;
}

export const DefaultCarouselProps: ICarouselDefaultProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    step: 1,
    currentSlide: 0,
    freeScroll: false,
};

export const DefaultCarouselContextProps: ICarouselContextProps = {
    ...DefaultCarouselProps,
    totalSlides: 0,
    updateContext: () => { },
    subscribers: [],
    slideTo: () => { },
};

export const CarouselContext = React.createContext<ICarouselContextProps>(DefaultCarouselContextProps);

