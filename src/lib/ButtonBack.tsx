import SliderButton, { IProps as P, IState as S, ButtonParameter } from "./SliderButton";

export interface IProps extends P {
}

export interface IState {
}

export default class ButtonBack extends SliderButton<IProps, IState> {

    getButtonProps(): ButtonParameter {

        return {
            ariaLabel: "previous",
            onClick: this.context.onBack,
        };
    }

};
