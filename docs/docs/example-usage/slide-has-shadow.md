---
sidebar_position: 1
title: Slide With Shadow
---


# Slide With Shadow

Since slides are put inside slider tray with scrolling feature, so the slider tray has a style `overflow: hidden`, which will hide overflow content and so that will hide shadow of slide.

To overcome this situation, you can put padding to tray and top/bottom to the slider tray DIV, and then put negative margin to slider DIV.

For example:

```jsx

<Carousel
    trayPadding={"15px"}
>
    <Slider
        style={{
            marginTop: "-15px",
            marginBottom: "-15px",
        }}
        trayProps={{
            style: {
                paddingTop: "15px",
                paddingBottom: "15px",
            }
        }}
    >
    </Slider>
</Carousel>
```