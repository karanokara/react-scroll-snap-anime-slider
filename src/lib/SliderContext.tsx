import React from 'react';
import { ISliderShareProps } from "./Types";

export const DefaultSliderShareProps: ISliderShareProps = {
    slideHeight: 1,
    slideWidth: 1,
};

export const ThemeContext = React.createContext<ISliderShareProps>(DefaultSliderShareProps);

