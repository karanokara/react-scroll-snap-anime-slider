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
                <h1 style={{ fontSize: "2.75rem" }}>{siteConfig.title}</h1>
                <h3 >
                    A simple slider using css style <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap" target="_blank">scroll-snap</a> and <a className="" style={{ color: "#FA196C", fontStyle: "italic" }} href="https://popmotion.io/" target="_blank">Popmotion</a>
                </h3>
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
            // title={`A Simple React Anime Slider`}
            // Description will go into a meta tag in <head />
            description="A Simple React Anime Slider">
            <HomepageHeader />

            <main style={{ position: "relative" }}>
                <HomepageFeatures />
            </main>

        </Layout>
    );
}
