import React from 'react';
import { ISliderDefaultProps } from "./Types";

export const DefaultSliderProps: ISliderDefaultProps = {
    slideHeight: 1,
    slideWidth: 1,
    visibleSlides: 1,
};

export const SliderContext = React.createContext<ISliderDefaultProps>(DefaultSliderProps);

