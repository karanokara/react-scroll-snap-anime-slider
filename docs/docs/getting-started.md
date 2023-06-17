---
sidebar_position: 1
description: A short start guide of using react scroll snap anime slider
keywords: [react scroll snap anime slider, getting started]
---

# Getting Started


## Install
```bash
npm install react-scroll-snap-anime-slider
```

## Create a simple slider

Here create a simple slider by just passing required props, then add a slide bar (line) and the prev/next buttons.

```jsx
import { ButtonBack, ButtonNext, Carousel, Slide, Slider, SliderBarLine } from "react-scroll-snap-anime-slider";

export function MySlider() {
    let total = 20;
    let visible = 3;
    let step = 3;

    return (
        <Carousel
            totalSlides={total}
            visibleSlides={visible}
            step={step}
        >
            <Slider>
                {new Array(total).fill(0).map((_, i) => {
                    return <Slide key={i}>
                        <div style={{ height: "100px", border: "1px solid #ccc", textAlign: "center" }}>slider# {i}</div>
                    </Slide>;
                })}
            </Slider>

            <SliderBarLine />

            <div style={{ textAlign: "center" }}>
                <ButtonBack>&lt;</ButtonBack>
                <ButtonNext>&gt;</ButtonNext>
            </div>

        </Carousel>
    );
}
```

<div align="right">

[![Edit react-scroll-snap-anime-slider-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-snap-anime-slider-starter-9k5f43?autoresize=1&fontsize=14&hidenavigation=1&theme=dark)

</div>
