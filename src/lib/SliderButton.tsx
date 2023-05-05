import React from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { SliderContext, } from "./SliderContext";

export type ButtonParameter = {
    ariaLabel: string;
    onClick: () => void;
};

export interface IProps extends P {
    disabled?: boolean;
}

export interface IState {
}

export default class SliderButton<PP extends IProps, SS extends IState> extends React.PureComponent<PP, SS> {

    public context!: React.ContextType<typeof SliderContext>;

    // to be inherited
    getButtonProps(): ButtonParameter {
        return {
            ariaLabel: "",
            onClick: () => { },
        };
    }

    render() {
        const {
            visibleSlides,
        } = this.context;
        const {
            className,
            disabled,
            ...otherProps
        } = this.props;

        const newClassName = cn(className);
        const buttonProps = this.getButtonProps();

        return (
            <button
                type="button"
                aria-label={buttonProps.ariaLabel}
                className={newClassName}
                onClick={buttonProps.onClick}
                disabled={disabled}
                {...otherProps}
            >
                {this.props.children}
            </button>
        );
    }
};

SliderButton.contextType = SliderContext;
