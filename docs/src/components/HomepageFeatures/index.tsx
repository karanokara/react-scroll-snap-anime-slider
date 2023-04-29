import React, { useState } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { random, colord } from "colord";
import { Slide, Slider } from "../../../../src";

type SlideItem = {
    title: string;
    background: string;
    color: string;
};

function Feature(props: SlideItem) {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundColor: props.background,
                color: props.color
            }}
        >
            <div className="text--center">
                <div className="text--center padding-horiz--md">
                    <h3>{props.title}</h3>
                </div>
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

                <Slider
                    totalSlides={slides.length}
                    visibleSlides={3}
                    slidesPerStep={3}
                    slideHeight={1}
                    slideWidth={0.8}
                >
                    {slides.map((props, idx) => (
                        <Slide
                            key={idx}

                        >
                            <Feature  {...props} />
                        </Slide>
                    ))}
                </Slider>

            </div>
        </section>
    );
}
