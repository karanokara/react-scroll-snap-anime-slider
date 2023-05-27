import React, { Component } from 'react';
import SliderBar, { IProps as P, IState as S } from "./SliderBar";
import { cn } from "./Utility";

export interface IProps extends P {
    trackProps?: React.HTMLAttributes<HTMLDivElement>;
    thumbProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface IState extends S {
}

export class SliderBarLine extends SliderBar<IProps, IState> {

    render() {
        const {
            visibleSlides,
            totalSlides,
        } = this.context;
        const {
            className,
            style,
            thumbProps,
            trackProps,
            ...otherProps
        } = this.props;
        let width = visibleSlides / totalSlides * 100;
        let left = this.state.left;

        if (left < 0) {
            width += left;
            left = 0;
        }

        if ((left + width) > 100) {
            width = 100 - left;
        }

        let thumbStyle: React.CSSProperties = {
            width: width + "%",
            left: left + "%",
        };

        const newClassName = cn("slider-bar", className);

        if (thumbProps) {
            thumbStyle = { ...thumbProps.style, ...thumbStyle };
        }

        return (
            <div
                {...otherProps}
                className={newClassName}
                style={style}
            >
                <div
                    {...trackProps}
                    className={cn("slider-bar-track", trackProps?.className)}
                >
                    <div
                        {...thumbProps}
                        className={cn("slider-bar-thumb", thumbProps?.className)}
                        style={thumbStyle}
                    />
                </div>
            </div>
        );
    }
}
