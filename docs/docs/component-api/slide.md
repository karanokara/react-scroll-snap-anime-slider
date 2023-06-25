---
sidebar_position: 3
title: Slide
---


# `<Slide/>`

Slide is a wrapper for your Slide content.

There are some level of elements inside it:

Slide -> Margin wrapper -> Padding wrapper -> Inner wrapper -> **Your element**

## Import

```jsx
import {Slide} from "react-scroll-snap-anime-slider";
```

## Usage

```jsx
<Slide
    key={i}
    aria-label="my slide"
>
    <div>Content<div/>
</Slide>
```

## Props


| Name                 |                  Type                  | Required | Default | Description                    |
| -------------------- | :------------------------------------: | :------: | :-----: | :----------------------------- |
| Any DIV Props        | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | DIV Element props              |
| innerMarginDivProps  | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the margin DIV        |
| innerPaddingDivProps | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the padding DIV       |
| innerWrapperDivProps | `React.HTMLAttributes<HTMLDivElement>` |    No    |         | Props to the inner wrapper DIV |


## CSS

You can override the default style by using these class names.

| Rule Name                    | Description           |
| ---------------------------- | --------------------- |
| `.rssas-slide`               | For Slide             |
| `.rssas-slide-inner-margin`  | For margin DIV        |
| `.rssas-slide-inner-padding` | For padding DIV       |
| `.rssas-slide-inner-wrapper` | for inner wrapper DIV |
