import React from 'react';
import { ISliderShareProps } from "./Types";

export const DefaultSliderShareProps: ISliderShareProps = {
    slideHeight: 1,
    slideWidth: 1,
    visibleSlides: 1,
};

export const SliderContext = React.createContext<ISliderShareProps>(DefaultSliderShareProps);

