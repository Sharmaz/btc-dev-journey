// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  guideSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: { type: 'doc', id: 'getting-started/index' },
      items: [
        'getting-started/requirements',
        'getting-started/environment',
      ],
    },
    {
      type: 'category',
      label: 'Environment Setup',
      link: { type: 'doc', id: 'environment-setup/index' },
      items: [
        'environment-setup/macos',
        'environment-setup/ubuntu',
        'environment-setup/uninstall-setup',
      ],
    },
    {
      type: 'category',
      label: 'Bitcoin Developer Roadmap',
      link: { type: 'doc', id: 'roadmap/index' },
      items: [
        'roadmap/how-to-use',
        'roadmap/developer-types',
      ],
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/prerequisites/index',
        'fundamentals/bitcoin-fundamentals/index',
        'fundamentals/bitcoin-architecture/index',
        'fundamentals/p2p-network/index',
        'fundamentals/basic-development/index',
      ],
    },
  ],
};

export default sidebars;
