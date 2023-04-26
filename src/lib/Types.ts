import { ColdSubscription } from "popmotion";

export interface IProps {
    className?: string,
    children?: React.ReactNode;
}

export interface ISliderShareProps extends IProps {
    /**
    * Slide dimension by comparing width and height,
    *  such as width:height = 16:9 
    */
    slideWidth: number;

    /**
     * Slide dimension by comparing width and height,
     *  such as width:height = 16:9 
     */
    slideHeight: number;
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
};

