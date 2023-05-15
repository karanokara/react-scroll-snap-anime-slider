import React, { Component } from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";

export interface IProps extends P {
    trackProps?: React.HTMLAttributes<HTMLDivElement>;
    thumbProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface IState {
    left: string;
}

export class SliderBar extends Component<IProps, IState> {

    public context!: React.ContextType<typeof CarouselContext>;

    constructor(prop: IProps) {
        super(prop);

        this.state = {
            left: "",
        };

        // console.log("slide context:", this.context); // undefined when construct
    }

    onScroll = (trayWidth: number, slideWidth: number, scrollLeft: number) => {
        const {
            totalSlides
        } = this.context;
        let totalWidth = totalSlides * slideWidth;
        let per = scrollLeft / totalWidth * 100;
        this.setState({ left: per + "%" });

    };

    componentDidMount(): void {

        const {
            currentSlide,
            visibleSlides,
            totalSlides,
            subscribers,
        } = this.context;

        // subscribe to onScroll change
        subscribers.push(this.onScroll);

        if (currentSlide !== 0) {
            let left = currentSlide / totalSlides * 100;
            this.setState({ left: left + "%" });
        }
    }

    render() {
        const {
            visibleSlides,
            totalSlides,

        } = this.context;
        const {
            className,
            style,
            thumbProps,
            ...otherProps
        } = this.props;
        let width = visibleSlides / totalSlides * 100;

        let thumbStyle: React.CSSProperties = {
            width: width + "%",
            left: this.state.left,
        };

        const newClassName = cn("slider-bar", className);

        if (thumbProps) {
            thumbStyle = { ...thumbProps.style, ...thumbStyle };
            delete thumbProps.style;
        }

        return (
            <div
                className={newClassName}
            >
                <div className="slider-bar-track">
                    <div
                        className="slider-bar-thumb"
                        style={thumbStyle}
                        {...thumbProps}
                    />
                </div>
            </div>
        );
    }
}

SliderBar.contextType = CarouselContext;
