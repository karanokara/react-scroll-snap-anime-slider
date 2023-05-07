import React, { useState } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { random, colord } from "colord";
import { ButtonBack, ButtonNext, Carousel, Slide, Slider } from "../../../../src";

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
    const [slideCount, setSlideCount] = useState(9);

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
        <section className={styles.features}>
            <div className="container">

                <div className="padding-vert--md" style={{ display: "flex" }}>

                    <div>
                        <div className="">
                            slideHeight: <input className="site-input" placeholder="" />
                        </div>
                        <div className="padding-top--xs">
                            slideWeight: <input className="site-input" placeholder="" />
                        </div>
                    </div>

                    <div>
                        <div className="">
                            slideHeight: <input className="site-input" placeholder="" />
                        </div>
                        <div className="padding-top--xs">
                            slideWeight: <input className="site-input" placeholder="" />
                        </div>
                    </div>
                </div>

                <Carousel
                    totalSlides={slides.length}
                    visibleSlides={3}
                    slidesPerStep={3}
                    slideHeight={1}
                    slideWidth={0.9}
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

                    <ButtonBack>&lt;</ButtonBack>

                    <ButtonNext>&gt;</ButtonNext>
                </Carousel>

            </div>
        </section>
    );
}
