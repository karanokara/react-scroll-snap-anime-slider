import React from 'react';
import { ICarouselDefaultProps } from "./Types";

export interface ICarouselContextProps extends ICarouselDefaultProps {
    totalSlides: number;
    updateContext<K extends keyof ICarouselContextProps>(state: Pick<ICarouselContextProps, K> | ICarouselContextProps | null): void;
}

export const DefaultCarouselContextProps: ICarouselContextProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    totalSlides: 0,
    step: 1,
    currentSlide: 0,
    updateContext: () => { },
};

export const CarouselContext = React.createContext<ICarouselContextProps>(DefaultCarouselContextProps);
