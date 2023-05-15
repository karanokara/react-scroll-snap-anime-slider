import React, { useState } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { random, colord } from "colord";
import { ButtonBack, ButtonNext, Carousel, Slide, Slider, SliderBar } from "../../../../src";

type SlideItem = {
    title: string;
    background: string;
    color: string;
};

function Feature(props: SlideItem) {
    const [count, setCount] = useState(0);
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundColor: props.background,
                color: props.color,
                alignItems: "center",
            }}
        >
            <div className="text--center" style={{ width: "100%" }}>
                <h3>{props.title}</h3>
                <div><button type="button" onClick={() => setCount(count + 1)} >Add Count</button></div>
                <div>{count}</div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    const [slideCount, setSlideCount] = useState(20);
    const [visibleSlides, setVisibleSlides] = useState(3);
    const [step, setStep] = useState(1);
    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(0.9);
    const [freeScroll, setFreeScroll] = useState(false);

    let slides: SlideItem[] = [];

    for (let i = 0; i < slideCount; ++i) {
        let c = random();
        let color = c.isLight() ? "#000" : "#fff";

        slides.push({
            title: "Slide #" + (i + 1),
            background: c.toHex(),
            color,
        });
    }

    return (
        <section >
            <div className={styles.featureSettingContainer} >

                <div className="padding--md">
                    <div className="">
                        Slide count: <input className="site-input" type="number" value={slideCount} onChange={(e) => setSlideCount(Number(e.target.value))} />
                    </div>
                    <div className="padding-top--xs">
                        Visible Slides: <input className="site-input" type="number" value={visibleSlides} onChange={(e) => setVisibleSlides(Number(e.target.value))} />
                    </div>
                </div>

                <div className="padding--md">
                    <div className="">
                        Steps: <input className="site-input" type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} />
                    </div>
                    {/* <div className="padding-top--xs">
                            slideWeight: <input className="site-input" placeholder="" />
                        </div> */}
                </div>

                <div className="padding--md">

                    <div className="">
                        Slide Height: <input className="site-input" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} step="0.1" />
                    </div>
                    <div className="padding-top--xs">
                        Slide Width: <input className="site-input" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} step="0.1" />
                    </div>

                    <div className="padding-top--xs" style={{ "color": " var(--ifm-color-secondary-darkest)", fontSize: "12px" }}>Height will become auto if set to 0</div>
                </div>

                <div className="padding--md">
                    <div className="">
                        Free Scroll?: <input className="" type="checkbox" checked={freeScroll} onChange={() => setFreeScroll(!freeScroll)} />
                    </div>
                    {/* <div className="padding-top--xs">
                            slideWeight: <input className="site-input" placeholder="" />
                        </div> */}
                </div>
            </div>

            <hr />

            <div className="container">
                <div className="padding-vert--md">
                    <Carousel
                        totalSlides={slides.length}
                        visibleSlides={visibleSlides}
                        step={step}
                        slideHeight={height}
                        slideWidth={width}
                        freeScroll={freeScroll}
                    >
                        <Slider
                        >
                            {slides.map((props, idx) => (
                                <Slide
                                    key={idx}
                                >
                                    <Feature  {...props} />
                                </Slide>
                            ))}
                        </Slider>

                        <SliderBar />

                        <ButtonBack>&lt;</ButtonBack>

                        <ButtonNext>&gt;</ButtonNext>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
