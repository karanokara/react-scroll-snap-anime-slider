import React from 'react';
import { ISliderDefaultProps } from "./Types";

export const DefaultSliderProps: ISliderDefaultProps = {
    slideHeight: 0,
    slideWidth: 0,
    visibleSlides: 1,
};

export const SliderContext = React.createContext<ISliderDefaultProps>(DefaultSliderProps);

