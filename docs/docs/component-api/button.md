---
sidebar_position: 4
title: Button
---


# `<ButtonBack/>` and `<ButtonNext/>`


These 2 buttons is used to move the slider 1 step back or next.

## Import

```jsx
import {ButtonNext, ButtonBack} from "react-scroll-snap-anime-slider";
```

## Usage

```jsx
<ButtonBack className="my-button-class">&lt;</ButtonBack>

<ButtonNext className="my-button-class">&gt;</ButtonNext>
```

## Props


| Name  |                   Type                    | Required | Default | Description                  |
| ----- | :---------------------------------------: | :------: | :-----: | :--------------------------- |
| props | `ButtonHTMLAttributes<HTMLButtonElement>` |    No    |         | Props to the ButtonBack/Next |


## CSS

You can override the default style by using these class names.

| Rule Name                   | Description            |
| --------------------------- | ---------------------- |
| `.rssas-slider-button`      | For Slider button      |
| `.rssas-slider-button-next` | For Slider button next |
| `.rssas-slider-button-back` | For Slider button back |
