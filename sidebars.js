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
    {
      type: 'category',
      label: 'Protocol Developer',
      link: { type: 'doc', id: 'tracks/protocol-developer/index' },
      items: [
        {
          type: 'category',
          label: 'Bitcoin Core Internals',
          link: { type: 'doc', id: 'tracks/protocol-developer/bitcoin-core-internals/index' },
          items: [
            'tracks/protocol-developer/bitcoin-core-internals/code-architecture',
            'tracks/protocol-developer/bitcoin-core-internals/consensus',
          ],
        },
        'tracks/protocol-developer/languages-tools/index',
        'tracks/protocol-developer/testing/index',
        'tracks/protocol-developer/bips/index',
        'tracks/protocol-developer/specialization-areas/index',
        'tracks/protocol-developer/security-cryptography/index',
        'tracks/protocol-developer/contributing-bitcoin-core/index',
      ],
    },
    {
      type: 'category',
      label: 'Application Developer',
      link: { type: 'doc', id: 'tracks/application-developer/index' },
      items: [
        {
          type: 'category',
          label: 'Libraries & SDKs',
          link: { type: 'doc', id: 'tracks/application-developer/libraries-sdks/index' },
          items: [
            'tracks/application-developer/libraries-sdks/javascript-typescript',
            'tracks/application-developer/libraries-sdks/python',
            'tracks/application-developer/libraries-sdks/rust',
            'tracks/application-developer/libraries-sdks/go',
          ],
        },
        'tracks/application-developer/wallet-development/index',
        'tracks/application-developer/payment-processing/index',
        'tracks/application-developer/exchange-trading/index',
        'tracks/application-developer/web3-bitcoin/index',
        'tracks/application-developer/advanced-protocols/index',
        'tracks/application-developer/protocols-on-bitcoin/index',
      ],
    },
  ],
};

export default sidebars;
