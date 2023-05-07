import React from 'react';
import { ICarouselDefaultProps } from "./Types";

export interface ISliderContextProps extends ICarouselDefaultProps {
    slideCount: number;
    onNext: { call: () => void; };
    onBack: { call: () => void; };
}

export const DefaultSliderContextProps: ISliderContextProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    slideCount: 0,
    slidesPerStep: 1,
    currentSlide: 0,
    onNext: { call: () => { } },
    onBack: { call: () => { } },
};

export const SliderContext = React.createContext<ISliderContextProps>(DefaultSliderContextProps);

