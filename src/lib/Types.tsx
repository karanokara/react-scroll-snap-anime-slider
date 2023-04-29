import { ColdSubscription } from "popmotion";

export interface IProps {
    className?: string,
    children?: React.ReactNode;
}

// props of slider with default value
export interface ISliderDefaultProps extends IProps {
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





