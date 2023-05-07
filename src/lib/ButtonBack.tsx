import SliderButton, { IProps as P, IState as S } from "./SliderButton";
import { cn } from "./Utility";

export interface IProps extends P {
}

export interface IState extends S {
}

export class ButtonBack extends SliderButton<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.className = cn(this.className, "slider-back-button");
        this.ariaLabel = "previous";
        this.onClick = this.context.onBack.call;
    }

};
