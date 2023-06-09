import { ColdSubscription } from "popmotion";

export interface IProps {
    id?: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

// props of slider with default value
export interface IDefaultCarouselProps {
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
     * How mange slides per step (when click previous and next button) 
     * 
     * -----------------------
     * Default: 1 (1 <= n <= visibleSlides)
     */
    step: number;

    /**
     * Current slide index (from 0)
     * 
     * -----------------------
     * Default: 0
     */
    currentSlide: number;

    /**
     * Is freely scrolling (not using snapping)?
     * 
     * -----------------------
     * Default: false
     */
    freeScroll: boolean;

    /**
     * (Only for mouse scrolling)
     * 
     * How light is the slide?
     * Higher number -> slide further
     * 
     * -----------------------
     * Default: 0.4
     */
    inertiaPower: number;

    /**
     * (Only for mouse scrolling)
     * 
     * The speed to reach (speed is decreasing), to stop inertia animation
     * 
     * -----------------------
     * Default: 800
     */
    inertiaStopSpeed: number;
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


