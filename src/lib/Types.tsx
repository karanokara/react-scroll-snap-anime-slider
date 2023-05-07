import { ColdSubscription } from "popmotion";

export interface IProps {
    className?: string,
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

// props of slider with default value
export interface ICarouselDefaultProps extends IProps {
    /**
     * Use to calculate slide's height in dimension,
     *  such as width:height = 16:9 
     * -----------------------
     * Default: 0, auto height
     */
    slideWidth: number;

    /**
     * Use to calculate slide's height in dimension,
     *  such as width:height = 16:9 
     * -----------------------
     * Default: 0, auto height
     */
    slideHeight: number;

    /**
     * How many visible slides (N), slide width = 100% / N
     * 
     * -----------------------
     * Default: 1
     */
    visibleSlides: number;

    /**
     * How mange slides per step (when click next button) 
     * 
     * -----------------------
     * Default: 1 (1 <= n <= visibleSlides)
     */
    slidesPerStep: number;

    /**
     * Current slide index (from 0)
     */
    currentSlide: number;
}

export interface TweenStartedAction extends ColdSubscription {
    isActive: () => boolean;
    stop: () => void;
    getProgress: () => number;
    getElapsed: () => number;
    pause: () => TweenStartedAction;
    resume: () => TweenStartedAction;
    seek: (progress: number) => TweenStartedAction;
    reverse: () => TweenStartedAction;
}


export type PointerValue = { x: number, y: number; };


