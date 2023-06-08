---
sidebar_position: 6
title: SliderBarDotGroup
---


# `<SliderBarLine/>`

This a customizable dot group for the slider.

## Import

```jsx
import {SliderBarDotGroup, renderDotsDynamicCircle} from "react-scroll-snap-anime-slider";
```

## Usage

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
