import { ColdSubscription } from "popmotion";

export interface IProps {
    className?: string,
    children?: React.ReactNode;
}

// props of slider with default value
export interface ISliderDefaultProps extends IProps {
    /**
     * Slide dimension by comparing width and height,
     *  such as width:height = 16:9 
     * -----------------------
     * Default: 1
     */
    slideWidth: number | "auto";

    /**
     * Slide dimension by comparing width and height,
     *  such as width:height = 16:9 
     * -----------------------
     * Default: 1
     */
    slideHeight: number | "auto";

    /**
     * How many visible slides 
     * 
     * -----------------------
     * Default: 1
     */
    visibleSlides: number;
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

