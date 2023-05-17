import SliderButton, { IProps as P, IState as S } from "./SliderButton";
import { cn } from "./Utility";

export interface IProps extends P {
}

export interface IState extends S {
}

export class ButtonNext extends SliderButton<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.isBack = false;
        this.className = cn(this.className, "slider-next-button");
        this.ariaLabel = "next";
        this.onClick = () => this.handleOnClick(true);
    }


};
