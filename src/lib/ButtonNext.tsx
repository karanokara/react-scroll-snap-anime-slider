import SliderButton, { IProps as P, IState as S } from "./SliderButton";
import { cn } from "./Utility";
import { ss } from "./Styles";

export interface IProps extends P {
}

export interface IState extends S {
}

export class ButtonNext extends SliderButton<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.isBack = false;
        this.className = cn(ss("slider-next-button"), this.className);
        this.ariaLabel = "next";
        this.onClick = () => this.handleOnClick(true);
    }


};
