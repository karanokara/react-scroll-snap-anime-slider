import React, { Component } from 'react';
import { IProps as P } from "./Types";
import { cn } from "./Utility";
import { CarouselContext, DefaultCarouselContextProps } from "./CarouselContext";

export interface IRenderDotsProps {
    /**
     * Total slides in this slider
     */
    totalSlides: number;

    /**
     * Current slide index (from 0)
     * 
     */
    currentSlide: number;

    /**
     * How many visible slides (N), slide width = 100% / N
     */
    visibleSlides: number;

    /**
     * How mange slides per step (when click previous and next button) 
     */
    step: number;
}

export interface IProps extends P, React.HTMLAttributes<HTMLDivElement> {
    trackProps?: React.HTMLAttributes<HTMLDivElement>;

    /**
     * To customize the dot group rendering by using the state props passed in
     * 
     * @returns 
     */
    renderDots?: (props: IRenderDotsProps) => JSX.Element;
}

export interface IState {
}

export class SliderDotGroup extends Component<IProps, IState> {

    public context!: React.ContextType<typeof CarouselContext>;
    public prevContext!: React.ContextType<typeof CarouselContext>;

    constructor(prop: IProps) {
        super(prop);

        this.state = {
        };

        // console.log("slide context:", this.context); // undefined when construct
    }

    onScroll = (trayWidth: number, slideWidth: number, scrollLeft: number) => {
        const {
            totalSlides
        } = this.context;
        const totalWidth = totalSlides * slideWidth;
        const per = scrollLeft / totalWidth * 100;

        this.setState({ left: per });
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (this.prevContext !== this.context) {
            // subscribe to onScroll change
            this.context.subscribers.push(this.onScroll);
            this.prevContext = this.context;
        }
    }


    componentDidMount(): void {
        // subscribe to onScroll change
        this.context.subscribers.push(this.onScroll);
        this.prevContext = this.context;
    }

    theDot(key: number, active: boolean) {
        return (
            <div key={key} className={cn("slider-dot", active ? "active" : "")}></div>
        );
    }

    renderDots(props: IRenderDotsProps) {
        let {
            visibleSlides,
            totalSlides,
            step,
            currentSlide,
        } = props;

        let dots: JSX.Element[] = [];
        let right = currentSlide + visibleSlides;
        let left = currentSlide;

        for (let i = 0; i < totalSlides; ++i) {
            dots.push(this.theDot(i, (left <= i && i < right)));
        }
        return dots;
    }

    render() {
        const {
            visibleSlides,
            totalSlides,
            step,
            currentSlide,
        } = this.context;
        const {
            className,
            trackProps,
            ...otherProps
        } = this.props;
        let renderDotsProps = {
            visibleSlides,
            totalSlides,
            step,
            currentSlide,
        };

        const newClassName = cn("slider-bar", className);

        return (
            <div
                {...otherProps}
                className={newClassName}
            >
                <div
                    {...trackProps}
                    className={cn("slider-bar-dot-group", trackProps?.className)}
                >
                    {this.renderDots(renderDotsProps)}
                </div>
            </div>
        );
    }
}

SliderDotGroup.contextType = CarouselContext;
