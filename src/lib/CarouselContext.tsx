import React from 'react';
import { IDefaultCarouselProps } from "./Types";

export type OnSlideProps = {
    /**
     * scrollLeft in px of the slider 
     */
    scrollLeft: number;

    /**
     * Current slide index (from 0)
     */
    currentSlide: number;

    /**
     * Width in px of a slide
     */
    slideWidth: number;

    /**
     * Width in px of the slider tray
     */
    trayWidth: number;
};

export interface ICarouselProps extends IDefaultCarouselProps {
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
    slideMargin?: string;

    /**
     * Padding the slider track to offset left/right side to see a little bit of prev/next hidden slide
     * 
     * -----------------------
     * value can be any pixel value: "5px", "1rem", ...
     */
    trayPadding?: string;

    /**
     * A callback function when slider is sliding
     * 
     * @param props 
     * @returns 
     */
    onSlide?: (props: OnSlideProps) => void;

    /**
     * Use simple ease function or Cubic Bezier parameters for snapping animation
     * 
     * (Used for snapping after mouse scrolling, and next/back button anime sliding)
     * 
     * -----------------------
     * Default: easeOut
     */
    snapAnimation?: "easeIn" | "easeOut" | "easeInOut" | [number, number, number, number];
}

export interface ICarouselContextProps extends ICarouselProps {
    updateContext<K extends keyof ICarouselContextProps>(state: Pick<ICarouselContextProps, K> | ICarouselContextProps | null): void;
    subscribers: ((trayWidth: number, slideWidth: number, scrollLeft: number) => void)[];
    slideTo: (slideIndex: number) => void;
}

export const DefaultCarouselProps: IDefaultCarouselProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    step: 1,
    currentSlide: 0,
    freeScroll: false,
    inertiaPower: 0.4,
};

export const DefaultCarouselContextProps: ICarouselContextProps = {
    ...DefaultCarouselProps,
    totalSlides: 0,
    updateContext: () => { },
    subscribers: [],
    slideTo: () => { },
};

export const CarouselContext = React.createContext<ICarouselContextProps>(DefaultCarouselContextProps);

