---
sidebar_position: 2
title: Slider
---

# `<Slider/>`

Slider is a wrapper for all the Slide elements. There is also a tray element inside it.  

## Import

```jsx
import {Slider} from "react-scroll-snap-anime-slider";
```

## Usage

```jsx
<Slider
    id="my-slider"
    aria-label="my slider"
>
    // Slide elements        
</Slider>
```

## Props


| Name      |                  Type                  | Required | Default | Description              |
| --------- | :------------------------------------: | :------: | :-----: | :----------------------- |
| trayProps | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the slider tray |


## CSS

You can override the default style by using these class names.

| Rule Name            | Description  |
| -------------------- | ------------ |
| `.rssas-slider`      | For Slider   |
| `.rssas-slider-tray` | For tray DIV |

