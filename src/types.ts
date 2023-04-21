import { ColdSubscription } from "popmotion";

export interface IProps {
    className?: string,
    children?: React.ReactNode;

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
