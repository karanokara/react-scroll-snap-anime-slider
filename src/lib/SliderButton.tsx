import React from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { SliderContext, } from "./SliderContext";

export interface IProps extends P {
    disabled?: boolean;
}

export interface IState {
}

export default class SliderButton<PP extends IProps, SS extends IState> extends React.PureComponent<PP, SS> {

    public context!: React.ContextType<typeof SliderContext>;

    public className = "slider-button";
    public ariaLabel = "";
    public onClick = () => { };

    render() {
        const {
            visibleSlides,
            slideCount,

        } = this.context;
        const {
            className,
            disabled,
            ...otherProps
        } = this.props;

        const newClassName = cn(this.className, className);

        return (
            <button
                type="button"
                aria-label={this.ariaLabel}
                className={newClassName}
                onClick={this.onClick}
                disabled={disabled}
                {...otherProps}
            >
                {this.props.children}
            </button>
        );
    }
};

SliderButton.contextType = SliderContext;
