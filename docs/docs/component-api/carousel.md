---
sidebar_position: 1
title: Carousel
---

# `<Carousel/>`

Carousel is a wrapper for the whole slider. You MUST use this component as a wrapper so other slider components can share some common props.

## Import

```jsx
import {Carousel} from "react-scroll-snap-anime-slider";
```

## Usage

```jsx
<Carousel
    totalSlides={10}
    visibleSlides={3}
    step={1}
>
    // any elements        
</Carousel>
```

## Props


| Name          |                   Type                    | Required |       Default       | Description                                                                                                                                                                   |
| ------------- | :---------------------------------------: | :------: | :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            |                 `string`                  |    No    |                     | DIV Element id                                                                                                                                                                |
| className     |                 `string`                  |    No    |                     | DIV Element class name                                                                                                                                                        |
| children      |                  `node`                   |    No    |                     | Carousel content                                                                                                                                                              |
| style         |              `CSSProperties`              |    No    |                     | DIV Element style object                                                                                                                                                      |
| totalSlides   |                 `number`                  |   Yes    |                     | Total slides in this slider                                                                                                                                                   |
| slideWidth    |                 `number`                  |    No    | 0 <br/> auto height | Use to calculate slide's height in dimension, such as width:height = 16:9                                                                                                     |
| slideHeight   |                 `number`                  |    No    | 0 <br/> auto height | Use to calculate slide's height in dimension, such as width:height = 16:9                                                                                                     |
| visibleSlides |                 `number`                  |    No    |          1          | How many visible slides (N), slide width = 100% / N                                                                                                                           |
| step          |                 `number`                  |    No    |          1          | How mange slides per step (when click previous and next button)                                                                                                               |
| currentSlide  |                 `number`                  |    No    |          0          | Current slide index (from 0)                                                                                                                                                  |
| slideMargin   |                 `string`                  |    No    |                     | Margin between each slide<br/> value can be any pixel value: "5px", "1rem", ... <br/>The result will be double, such as "5px" => then the gap between 2 slides will be "10px" |
| trayPadding   |                 `string`                  |    No    |                     | Padding the slider track to offset left/right side to see a little bit of prev/next hidden slide                                                                              |
| freeScroll    |                 `boolean`                 |    No    |        false        | Is freely scrolling (not using snapping)?                                                                                                                                     |
| onSlide       |                  `func`                   |    No    |                     | `(props: OnSlideProps) => void` <br/> A callback function when slider is sliding                                                                                              |
| snapAnimation | `string`, `[number,number,number,number]` |    No    |       easeOut       | Use simple ease function or Cubic Bezier parameters for snapping animation <br/>(Used for snapping after mouse scrolling, and next/back button anime sliding)                 |
| inertiaPower  |                 `number`                  |    No    |         0.4         | How light is the slide? <br/>Higher number -> slide further <br/>(Only for mouse scrolling)                                                                                   |

### Other Props


#### OnSlideProps 
This is an object with some helpful slider latest state variables inside.


| Name         |   Type   | Description                                                 |
| ------------ | :------: | :---------------------------------------------------------- |
| scrollLeft   | `number` | How far has scrolled in px                                  |
| currentSlide | `number` | Current slide index (from 0 ~ (length - visible slide - 1)) |
| slideWidth   | `number` | Width in px of a slide                                      |
| trayWidth    | `number` | width in px of the tray DIV                                 |


An example such as you can update your local current slide index to match the slide index of the slider:

```jsx
<Carousel
    onSlide={({ currentSlide }) => { localCurrentSlide.index = currentSlide; }}
></Carousel>
```


## CSS

You can override the default style by using these class names.

| Rule Name        |
| ---------------- |
| `.rssas-wrapper` |
