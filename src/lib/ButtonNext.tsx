import SliderButton, { IProps as P, IState as S, ButtonParameter } from "./SliderButton";

export interface IProps extends P {
}

export interface IState {
}

export default class ButtonNext extends SliderButton<IProps, IState> {

    getButtonProps(): ButtonParameter {
        return {
            ariaLabel: "next",
            onClick: this.context.onNext,
        };
    }
};
