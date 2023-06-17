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

Code Sandbox example:

<iframe src="https://codesandbox.io/embed/react-scroll-snap-anime-slider-with-shadow-rnvyxm?fontsize=14&hidenavigation=1&theme=light"
     style={{"width":"100%", "height":"500px", border:"1px solid #ccc", "borderRadius": "4px", overflow:"hidden"}}
     title="react-scroll-snap-anime-slider-starter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
