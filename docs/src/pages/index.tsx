import React from 'react';
import { clsx } from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('', styles.heroBanner)}>
            <div className={styles.heroBannerBg}></div>
            <div className="container" style={{ position: "relative" }}>
                <h1 className="hero__title">{siteConfig.title}</h1>
                <h5 className="hero__subtitle">
                    A simple slider using css style scroll-snap and <a className="" style={{ color: "#FA196C", fontStyle: "italic" }} href="https://popmotion.io/" target="_blank">Popmotion</a>
                </h5>
                <div className={styles.buttons}>
                    {/* <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Docusaurus Tutorial - 5minfffffff ⏱️
                    </Link> */}
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            // page title shown on document title
            title={`A Simple React Anime Slider`}
            // Description will go into a meta tag in <head />
            description="A Simple React Anime Slider">
            <HomepageHeader />

            <main style={{ position: "relative" }}>
                <HomepageFeatures />
            </main>

        </Layout>
    );
}
