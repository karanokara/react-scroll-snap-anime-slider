import React from 'react';
import { clsx } from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import packageJson from "../../../package.json";


function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('', styles.heroBanner)}>
            <div className={styles.heroBannerBg}></div>
            <div className="container" style={{ position: "relative" }}>
                <h1 style={{ fontSize: "2.5rem" }}>{siteConfig.title}</h1>
                <h4 >
                    A simple slider using css style <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap" target="_blank">scroll-snap</a> and <a className="" style={{ color: "#FA196C", fontStyle: "italic" }} href="https://popmotion.io/" target="_blank">Popmotion</a>
                </h4>
                <div className={styles.buttons}>
                    <Link
                        className="button button--primary"
                        to="/docs/getting-started">
                        Getting Started <b style={{ fontSize: "12px" }}>(v{packageJson.version})</b>
                    </Link>
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
            // Description will go into a meta tag in <head />
            description={packageJson.description}
        // title={`A Simple React Anime Slider`}
        >
            <HomepageHeader />

            <main style={{ position: "relative" }}>
                <HomepageFeatures />
            </main>

        </Layout>
    );
}
