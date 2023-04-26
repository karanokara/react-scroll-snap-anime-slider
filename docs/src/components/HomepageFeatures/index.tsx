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

// type FeatureItem = {
//     title: string;
//     Svg: React.ComponentType<React.ComponentProps<'svg'>>;
// };

// const FeatureList: FeatureItem[] = [
//     {
//         title: '111111111',
//         Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,

//     },
//     {
//         title: '22222222',
//         Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,

//     },
//     {
//         title: '333333333',
//         Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,

//     },
//     {
//         title: '444444444',
//         Svg: require('@site/static/img/undraw_algolia.svg').default,

//     },
//     {
//         title: '555555555',
//         Svg: require('@site/static/img/undraw_react.svg').default,

//     },
//     {
//         title: '66666666',
//         Svg: require('@site/static/img/undraw_version_control.svg').default,

//     },
//     {
//         title: '77777777',
//         Svg: require('@site/static/img/undraw_typewriter.svg').default,

//     },
//     {
//         title: '8888888888',
//         Svg: require('@site/static/img/undraw_world.svg').default,

//     },
// ];

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
        slides.push({
            title: "Slide #" + (i + 1),
            background: c.toHex(),
            color: c.invert().toHex(),
        });
    }

    return (
        <section className={styles.features}>
            <div className="container">

                <Slider
                    totalSlides={slides.length}
                    visibleSlides={3}
                    slidesPerStep={3}
                >
                    {slides.map((props, idx) => (
                        <Slide key={idx}>
                            <Feature  {...props} />
                        </Slide>
                    ))}
                </Slider>

            </div>
        </section>
    );
}
