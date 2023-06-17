---
sidebar_position: 2
title: Auto Scrolling
---


# Auto Scrolling

It is easy implement auto scrolling by using ref to the `Slider` component and then call class function `slideTo()` to achieve auto sliding by yourself.

Since slider itself maintains its current slider index, so you also need to create a local variable to sycn with the slider's inner current slide index using `onSlide` callback to update your local current slide index.

Example on Code Sandbox:

<iframe src="https://codesandbox.io/embed/react-scroll-snap-anime-slider-auto-slide-xg9pjj?fontsize=14&hidenavigation=1&theme=light"
     style={{"width":"100%", "height":"500px", border:"1px solid #ccc", "borderRadius": "4px", overflow:"hidden"}}
     title="react-scroll-snap-anime-slider-starter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
