import React from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { Slide, Slider } from "../../../../src";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: '111111111',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                111
            </>
        ),
    },
    {
        title: '22222222',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                222
            </>
        ),
    },
    {
        title: '333333333',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                333
            </>
        ),
    },
    {
        title: '444444444',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                444
            </>
        ),
    },
    {
        title: '555555555',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                555
            </>
        ),
    },
    {
        title: '66666666',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                666
            </>
        ),
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div
        // className={clsx('col col--4')}
        >
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
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
