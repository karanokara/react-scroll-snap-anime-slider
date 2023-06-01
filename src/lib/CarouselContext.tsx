import React from 'react';
import { ICarouselDefaultProps } from "./Types";

export interface ICarouselContextProps extends ICarouselDefaultProps {
    totalSlides: number;
    updateContext<K extends keyof ICarouselContextProps>(state: Pick<ICarouselContextProps, K> | ICarouselContextProps | null): void;
    subscribers: ((trayWidth: number, slideWidth: number, scrollLeft: number) => void)[];
    slideTo: (slideIndex: number) => void;
    margin?: string;
    offset?: string;
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

