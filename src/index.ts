// import "./scss/style.module.scss";

export { Carousel } from "./lib/Carousel";
export type { IProps as ICarouselProps } from "./lib/Carousel";
export type { OnSlideProps, ICarouselContextProps } from "./lib/CarouselContext";
export { Slider } from "./lib/Slider";
export type { IProps as ISliderProps } from "./lib/Slider";
export { Slide } from "./lib/Slide";
export type { IProps as SlideProps } from "./lib/Slide";
export { ButtonBack } from "./lib/ButtonBack";
export { ButtonNext } from "./lib/ButtonNext";
export { SliderBarLine } from "./lib/SliderBarLine";
export { SliderBarDotGroup } from "./lib/SliderBarDotGroup";
export type { IRenderDotsProps } from "./lib/SliderBarDotGroup";
export { renderDotsDynamicCircle, renderDotsDynamicPill, renderDotsDynamicByScale, CircleDot, PillDot } from "./lib/DotGroupRenderDotsUtil";
export type { ScaleDot, ScaleDotProps } from "./lib/DotGroupRenderDotsUtil";

// utility
export * from "./lib/Utility";

// types
export * from "./lib/Types";