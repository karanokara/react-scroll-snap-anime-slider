import SliderButton, { IProps as P, IState as S } from "./SliderButton";
import { cn } from "./Utility";
import { ss } from "./Styles";

export interface IProps extends P {
}

export interface IState extends S {
}

export class ButtonBack extends SliderButton<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.className = cn(ss("slider-button-back"), ss(this.className));
        this.ariaLabel = "previous";
        this.onClick = () => this.handleOnClick(false);
    }

};
