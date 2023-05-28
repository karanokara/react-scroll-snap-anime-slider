// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const author = "karanokara";
const authorTitle = "KaraNoKara";
const authorSite = "https://karanokara.cc";
const project = "react-scroll-snap-anime-slider";
const githubSite = "https://github.com/" + author;
const githubRepo = githubSite + "/" + project;
const githubPage = `https://${author}.github.io/`;
const baseUrl = "/" + project + "/";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Scroll Snap Anime Slider",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: githubPage,

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: author, // Usually your GitHub org/user name.
  projectName: project, // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: [
      "en",
      //  "jp"
    ],
  },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // sidebarCollapsible: true,

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/social-card.png",
      navbar: {
        hideOnScroll: true,
        title: "React Scroll Snap Anime Slider",
        logo: {
          alt: "My Site Logo",
          src: "/img/logo-slider.png",
        },
        items: [
          {
            // type: 'doc',
            // docId: "doc",
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          //   // dropdownItemsAfter: [
          //   //   {
          //   //     type: 'html',
          //   //     value: '<hr style="margin: 0.3rem 0;">',
          //   //   },
          //   //   {
          //   //     href: 'https://github.com/facebook/docusaurus/issues/3526',
          //   //     label: 'Help Us Translate',
          //   //   },
          //   // ],
          // },
          {
            href: githubRepo,
            // label: "GitHub",
            position: "right",
            className: 'header-github-link',
            'aria-label': 'GitHub repository',

          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            // title: "About",
            items: [
              // {
              //   label: "Blog",
              //   href: "https://blog.karanokara.cc",
              // },
              // {
              //   label: "GitHub",
              //   href: "https://github.com/karanokara",
              // },
              {
                html: `
                  <a href="${authorSite}" target="_blank" rel="noreferrer noopener" aria-label="${authorTitle} Blog" title="Click to ${authorTitle}">
                    <img width="50" height="50" src="${baseUrl}img/logo-karanokara.png" alt="${authorTitle}" />
                  </a>
                `,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} By ${authorTitle}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
