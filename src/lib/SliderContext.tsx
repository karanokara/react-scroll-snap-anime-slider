import React from 'react';
import { ISliderDefaultProps } from "./Types";

export interface ISliderContextProps extends ISliderDefaultProps {
    slideCount: number;
}

export const DefaultSliderContextProps: ISliderContextProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
    slideCount: 0,
    slidesPerStep: 1,
};

export const SliderContext = React.createContext<ISliderContextProps>(DefaultSliderContextProps);

