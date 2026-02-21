// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BTC Dev Journey',
  tagline: 'Bitcoin & Lightning Network Development Guides',
  favicon: 'img/favicon.ico',
  url: 'https://btc-journey.dev',
  baseUrl: '/',
  organizationName: 'Sharmaz',
  projectName: 'btc-dev-journey',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  scripts: [
    {
      src: 'https://analytics.ahrefs.com/analytics.js',
      'data-key': 'kQ78wQaAsbSQiiponLkndA',
      async: true,
    },
  ],

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
        path: 'en',
      },
      es: {
        label: 'Español',
        htmlLang: 'es-MX',
        path: 'es',
      },
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/btc-dev-journey.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/btc-dev-journey-social-card.png',
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'dark',
        },
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'BTC Dev Journey',
        logo: {
          alt: 'BTC Dev Journey Logo',
          src: 'img/btc-dev-journey-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guideSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            href: 'https://github.com/Sharmaz/btc-dev-journey',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Guides',
            items: [
              {
                label: 'Intro',
                to: '/docs/intro',
              },
              {
                label: 'Getting started',
                to: '/docs/getting-started',
              },
              {
                label: 'Environment setup',
                to: '/docs/environment-setup',
              },
            ],
          },
          {
            title: 'Roadmap',
            items: [
              {
                label: 'Developer Roadmap',
                to: '/docs/roadmap',
              },
              {
                label: 'Fundamentals',
                to: '/docs/fundamentals/prerequisites',
              },
              {
                label: 'Types of Developers',
                to: '/docs/roadmap/developer-types',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Books',
                to: '/docs/resources/books',
              },
              {
                label: 'Courses',
                to: '/docs/resources/courses',
              },
              {
                label: 'Communities',
                to: '/docs/resources/communities',
              },
              {
                label: 'Practical Projects',
                to: '/docs/practical-projects',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Bitcoin Guadalajara',
                href: 'https://btcgdl.com/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Sharmaz/btc-dev-journey',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BTC Dev Journey, Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
