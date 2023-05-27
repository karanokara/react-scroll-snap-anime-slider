import React, { useState } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { random, colord } from "colord";
import { ButtonBack, ButtonNext, Carousel, Slide, Slider, SliderBarLine, SliderBarDotGroup, renderDotsDynamicCircle, renderDotsDynamicPill } from "../../../../src";

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
                <div><button className="button button--sm button--secondary" type="button" onClick={() => setCount(count + 1)} >Add Count</button></div>
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
    const [width, setWidth] = useState(1.2);
    const [freeScroll, setFreeScroll] = useState(false);
    const [buttons, setButtons] = useState(true);
    const [scrollbar, setScrollbar] = useState(true);
    const [dotGroup, setDotGroup] = useState(true);
    const [dotGroupType, setDotGroupType] = useState(1);

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
            <div className="container">
                <div className="padding-bottom--md">
                    <Carousel
                        totalSlides={slides.length}
                        visibleSlides={visibleSlides}
                        step={step}
                        slideHeight={height}
                        slideWidth={width}
                        freeScroll={freeScroll}
                        currentSlide={0}
                    >
                        <Slider
                            aria-label="my slider"
                            style={{ borderRadius: "1rem", overflow: "hidden" }}
                        >
                            {slides.map((props, i) => (
                                <Slide
                                    key={i}
                                    aria-label="my slide"
                                >
                                    <Feature  {...props} />
                                </Slide>
                            ))}
                        </Slider>

                        {scrollbar &&
                            <SliderBarLine
                                id="my-slider-bar"
                                className="margin-top--md"
                                aria-label="slider bar"
                                trackProps={{
                                    id: "my-slider-bar-track",
                                    "aria-label": "slider track",
                                    style: { borderRadius: "1rem" }
                                }}
                                thumbProps={{
                                    id: "my-slider-bar-thumb",
                                    "aria-label": "slider thumb",
                                    style: { borderRadius: "1rem" }
                                }}
                            />
                        }

                        {dotGroup &&
                            <SliderBarDotGroup
                                id="my-slider-dot-group"
                                className="margin-top--md"
                                aria-label="slider bar"
                                dotGroupProps={{
                                    id: "my-slider-bar-dot-track",
                                    "aria-label": "slider track"
                                }}
                                renderDots={dotGroupType === 1
                                    ? renderDotsDynamicCircle
                                    : ((dotGroupType === 2)
                                        ? renderDotsDynamicPill
                                        : undefined)
                                }
                            />
                        }

                        {buttons &&
                            <div className="margin-top--md" style={{ textAlign: "center" }}>
                                <ButtonBack className="button button--primary">&lt;</ButtonBack>

                                <ButtonNext className="button button--primary margin-left--md">&gt;</ButtonNext>
                            </div>
                        }

                    </Carousel>
                </div>
            </div>

            <hr />

            <div className={styles.featureSettingContainer} >

                <div className="padding--md">
                    <div className="">
                        Slide count: <input className="site-input" type="number" value={slideCount} onChange={(e) => setSlideCount(Number(e.target.value))} />
                    </div>
                    <div className="padding-top--xs">
                        Visible slides: <input className="site-input" type="number" value={visibleSlides} onChange={(e) => setVisibleSlides(Number(e.target.value))} />
                    </div>
                    <div className="padding-top--xs">
                        Slides per step: <input className="site-input" type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} />
                    </div>
                </div>

                <div className="padding--md">

                    <div className="">
                        Slide height: <input className="site-input" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} step="0.1" />
                    </div>
                    <div className="padding-top--xs">
                        Slide width: <input className="site-input" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} step="0.1" />
                    </div>

                    <div className="padding-top--xs" style={{ "color": " var(--ifm-color-secondary-darkest)", fontSize: "12px" }}>Height will become auto if set to 0</div>
                </div>

                <div className="padding--md">
                    <div className="">
                        Free Scroll?: <input className="" type="checkbox" checked={freeScroll} onChange={() => setFreeScroll(!freeScroll)} />
                    </div>

                    <div className="padding-top--xs">
                        Show scrollbar?: <input className="" type="checkbox" checked={scrollbar} onChange={() => setScrollbar(!scrollbar)} />
                    </div>

                    <div className="padding-top--xs">
                        Show buttons?: <input className="" type="checkbox" checked={buttons} onChange={() => setButtons(!buttons)} />
                    </div>
                </div>

                <div className="padding--md">

                    <div className="">
                        Show dot group?: <input className="" type="checkbox" checked={dotGroup} onChange={() => setDotGroup(!dotGroup)} />
                    </div>

                    <div className="padding-top--xs">
                        Normal: <input className="" type="radio" name="dot-type" checked={dotGroupType === 0} onChange={() => setDotGroupType(0)} disabled={!dotGroup} />
                    </div>

                    <div className="">
                        Dynamic circle: <input className="" type="radio" name="dot-type" checked={dotGroupType === 1} onChange={() => setDotGroupType(1)} disabled={!dotGroup} />
                    </div>

                    <div className="">
                        Dynamic pill: <input className="" type="radio" name="dot-type" checked={dotGroupType === 2} onChange={() => setDotGroupType(2)} disabled={!dotGroup} />
                    </div>
                </div>
            </div>
        </section>
    );
}
