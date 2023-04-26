import React from 'react';
import { ISliderShareProps } from "./TTT";

export const DefaultSliderShareProps: ISliderShareProps = {
    slideHeight: 1,
    slideWidth: 1,
};

export const ThemeContext = React.createContext<ISliderShareProps>(DefaultSliderShareProps);

