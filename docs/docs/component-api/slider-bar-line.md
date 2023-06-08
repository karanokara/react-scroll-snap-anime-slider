---
sidebar_position: 5
title: SliderBarLine
---


# `<SliderBarLine/>`

This a customizable scrollbar for the slider.

## Import

```jsx
import {SliderBarLine} from "react-scroll-snap-anime-slider";
```

## Usage

```jsx
<SliderBarLine
    id="my-slider-bar-line"
    className="my-class-name"
    aria-label="slider bar line"
    trackProps={{
        id: "my-slider-bar-track",
        "aria-label": "slider track",
    }}
    thumbProps={{
        id: "my-slider-bar-thumb",
        "aria-label": "slider thumb",
    }}
    style={{ padding: "0 10px" }}
/>
```

## Props


| Name       |                  Type                  | Required | Default | Description            |
| ---------- | :------------------------------------: | :------: | :-----: | :--------------------- |
| trackProps | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the track DIV |
| thumbProps | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the thumb DIV |

## CSS

You can override the default style by using these class names.

| Rule Name                 | Description     |
| ------------------------- | --------------- |
| `.rssas-slider-bar`       | For bar wrapper |
| `.rssas-slider-bar-track` | For track       |
| `.rssas-slider-bar-thumb` | For thumb       |
