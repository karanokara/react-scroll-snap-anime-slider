import React from 'react';
import { ISliderDefaultProps } from "./Types";

export interface ISliderContextProps extends ISliderDefaultProps {
    slideCount: number;
    onNext: () => void;
    onBack: () => void;
}

export const DefaultSliderContextProps: ISliderContextProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    slideCount: 0,
    slidesPerStep: 1,
    onNext: () => { },
    onBack: () => { },
};

export const SliderContext = React.createContext<ISliderContextProps>(DefaultSliderContextProps);

