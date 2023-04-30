// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const project = "react-scroll-snap-anime-slider";
const githubRepo = "https://github.com/" + project;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Scroll Snap Anime Slider",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "karanokara", // Usually your GitHub org/user name.
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
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        hideOnScroll: true,
        title: "React Scroll Snap Anime Slider",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
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
          {
            type: 'localeDropdown',
            position: 'right',
            // dropdownItemsAfter: [
            //   {
            //     type: 'html',
            //     value: '<hr style="margin: 0.3rem 0;">',
            //   },
            //   {
            //     href: 'https://github.com/facebook/docusaurus/issues/3526',
            //     label: 'Help Us Translate',
            //   },
            // ],
          },
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
        style: "dark",
        links: [
          {
            title: "About",
            items: [
              {
                label: "Blog",
                href: "https://blog.karanokara.cc",
              },
              // {
              //   label: "GitHub",
              //   href: "https://github.com/karanokara",
              // },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KaraNoKara, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
