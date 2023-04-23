import React from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { Slide, Slider } from "../../../../src";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
};

const FeatureList: FeatureItem[] = [
    {
        title: '111111111',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,

    },
    {
        title: '22222222',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,

    },
    {
        title: '333333333',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,

    },
    {
        title: '444444444',
        Svg: require('@site/static/img/undraw_algolia.svg').default,

    },
    {
        title: '555555555',
        Svg: require('@site/static/img/undraw_react.svg').default,

    },
    {
        title: '66666666',
        Svg: require('@site/static/img/undraw_version_control.svg').default,

    },
    {
        title: '77777777',
        Svg: require('@site/static/img/undraw_typewriter.svg').default,

    },
    {
        title: '8888888888',
        Svg: require('@site/static/img/undraw_world.svg').default,

    },
];

function Feature({ title, Svg, }: FeatureItem) {
    return (
        <div
        // className={clsx('col col--4')}
        >
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {

    return (
        <section className={styles.features}>
            <div className="container">

                <Slider >
                    {FeatureList.map((props, idx) => (
                        <Slide key={idx}>
                            <Feature  {...props} />
                        </Slide>
                    ))}
                </Slider>

            </div>
        </section>
    );
}
