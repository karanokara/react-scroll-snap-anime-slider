---
sidebar_position: 6
title: SliderBarDotGroup
---


# `<SliderDotGroup/>`

This a customizable dot group component for the slider.

## Import

```jsx
import {SliderBarDotGroup, renderDotsDynamicCircle} from "react-scroll-snap-anime-slider";
```

## Usage

An example to use dynamic circle as dot group by using `renderDotsDynamicCircle` as a dot rendering function:
```jsx
<SliderBarDotGroup
    id="my-slider-dot-group"
    className="my-class-name"
    aria-label="slider bar"
    dotGroupProps={{
        id: "my-slider-bar-dot-group",
    }}
    renderDots={renderDotsDynamicCircle}
/>
```

Also there is a `renderDotsDynamicPill` which will render dot as a pill:

```jsx
import {SliderBarDotGroup, renderDotsDynamicPill} from "react-scroll-snap-anime-slider";
```


## Props


| Name          |                            Type                            | Required | Default | Description                                                             |
| ------------- | :--------------------------------------------------------: | :------: | :-----: | :---------------------------------------------------------------------- |
| Any DIV Props |           `React.HTMLAttributes<HTMLDivElement>`           |    No    |         | DIV Element props                                                       |
| dotGroupProps |           `React.HTMLAttributes<HTMLDivElement>`           |    No    |         | Props to the dot group DIV                                              |
| renderDots    | `(props: IRenderDotsProps) => JSX.Element / JSX.Element[]` |    No    |         | To customize the dot group rendering by using the state props passed in |


## Other Props

### IRenderDotsProps

| Name          |              Type              | Description                                                                                                                                                                                  |
| ------------- | :----------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| totalSlides   |            `number`            | Total slides in this slider                                                                                                                                                                  |
| currentSlide  |            `number`            | Current slide index (from 0 ~ (length - visible slide - 1))                                                                                                                                  |
| visibleSlides |            `number`            | How many visible slides (N), then the slide width = 100% / N                                                                                                                                 |
| step          |            `number`            | How mange slides per step (when click previous and next button)                                                                                                                              |
| left          |            `number`            | How far has scrolled in %, range in [0 ~ (100 - % of visible slides)]                                                                                                                        |
| slideTo       | `(slideIndex: number) => void` | A function to call to control the slider to slide to a target slide <br/> From 0 ~ (length - visible slide - 1) <br/> If no customized function is provided, a default function will be used |
 
A starter example:

```jsx title="MyDotGroup.tsx"
import {SliderBarDotGroup, IRenderDotsProps} from "react-scroll-snap-anime-slider";

function myRenderDots(props: IRenderDotsProps) {
    let {
        visibleSlides,
        totalSlides,
        step,
        left,
        currentSlide,
        slideTo,
    } = props;

    let dots: JSX.Element[] = [];

    for (let i = 0; i < totalSlides; ++i) {
        // your customization code to get customized style

        dots.push(
            <div
                className="my-dot-class"
                key={i}
                style={// customized style}
                onClick={() => {
                    slideTo(i);
                }}
            />
        );
    }
    return dots;
}

export function MyDotGroup(){
    return (
        <SliderBarDotGroup
            renderDots={myRenderDots}
        />
    );
}
```

## CSS

You can override the default style by using these class names.

| Rule Name                     | Description                              |
| ----------------------------- | ---------------------------------------- |
| `.rssas-slider-bar`           | For bar wrapper                          |
| `.rssas-slider-bar-dot-group` | For dot group DIV                        |
| `.rssas-slider-dot-wrapper`   | For dot wrapper DIV                      |
| `.rssas-active`               | For dot wrapper DIV that is active       |
| `.rssas-dynamic`              | For dot wrapper DIV that has dynamic dot |
| `.rssas-slider-dot`           | For dot DIV                              |

