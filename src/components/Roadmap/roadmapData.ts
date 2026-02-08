import type { Node, Edge } from '@xyflow/react';

const nodeDefaults = {
  style: {
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Fira Code, monospace',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
};

const fundamentalStyle = {
  ...nodeDefaults.style,
  background: '#2a9409',
  color: '#ffffff',
  border: '2px solid #1e6d07',
  padding: '12px 20px',
  fontWeight: 600,
  width: 220,
};

const trackStyle = {
  ...nodeDefaults.style,
  padding: '14px 20px',
  fontWeight: 700,
  width: 240,
  border: '2px solid',
};

const decisionStyle = {
  ...nodeDefaults.style,
  background: '#f5a623',
  color: '#1a1a1a',
  border: '2px solid #d4891a',
  padding: '14px 24px',
  fontWeight: 700,
  width: 240,
};

export const nodes: Node[] = [
  // Fundamentals (vertical flow)
  {
    id: 'prerequisites',
    data: { label: 'Prerequisites', url: '/docs/fundamentals/prerequisites' },
    position: { x: 300, y: 0 },
    style: fundamentalStyle,
  },
  {
    id: 'bitcoin-fundamentals',
    data: { label: 'Bitcoin Fundamentals', url: '/docs/fundamentals/bitcoin-fundamentals' },
    position: { x: 300, y: 80 },
    style: fundamentalStyle,
  },
  {
    id: 'bitcoin-architecture',
    data: { label: 'Bitcoin Architecture', url: '/docs/fundamentals/bitcoin-architecture' },
    position: { x: 300, y: 160 },
    style: fundamentalStyle,
  },
  {
    id: 'p2p-network',
    data: { label: 'P2P Network', url: '/docs/fundamentals/p2p-network' },
    position: { x: 300, y: 240 },
    style: fundamentalStyle,
  },
  {
    id: 'basic-development',
    data: { label: 'Basic Development', url: '/docs/fundamentals/basic-development' },
    position: { x: 300, y: 320 },
    style: fundamentalStyle,
  },
  // Decision point
  {
    id: 'choose-track',
    data: { label: 'Choose Your Track' },
    position: { x: 300, y: 420 },
    style: decisionStyle,
  },
  // Tracks (spread horizontally)
  {
    id: 'protocol',
    data: { label: 'Protocol Developer', url: '/docs/roadmap/developer-types#protocol-developer' },
    position: { x: 0, y: 540 },
    style: {
      ...trackStyle,
      background: '#6366f1',
      color: '#ffffff',
      borderColor: '#4f46e5',
    },
  },
  {
    id: 'application',
    data: { label: 'Application Developer', url: '/docs/roadmap/developer-types#application-developer' },
    position: { x: 260, y: 540 },
    style: {
      ...trackStyle,
      background: '#ec4899',
      color: '#ffffff',
      borderColor: '#db2777',
    },
  },
  {
    id: 'infrastructure',
    data: { label: 'Infrastructure Developer', url: '/docs/roadmap/developer-types#infrastructure-developer' },
    position: { x: 520, y: 540 },
    style: {
      ...trackStyle,
      background: '#f97316',
      color: '#ffffff',
      borderColor: '#ea580c',
    },
  },
  {
    id: 'mining',
    data: { label: 'Mining Developer', url: '/docs/roadmap/developer-types#mining-developer' },
    position: { x: 780, y: 540 },
    style: {
      ...trackStyle,
      background: '#14b8a6',
      color: '#ffffff',
      borderColor: '#0d9488',
    },
  },
];

const edgeDefaults = {
  animated: true,
  style: { stroke: '#3be308', strokeWidth: 2 },
};

export const edges: Edge[] = [
  // Fundamental chain
  { id: 'e1', source: 'prerequisites', target: 'bitcoin-fundamentals', ...edgeDefaults },
  { id: 'e2', source: 'bitcoin-fundamentals', target: 'bitcoin-architecture', ...edgeDefaults },
  { id: 'e3', source: 'bitcoin-architecture', target: 'p2p-network', ...edgeDefaults },
  { id: 'e4', source: 'p2p-network', target: 'basic-development', ...edgeDefaults },
  { id: 'e5', source: 'basic-development', target: 'choose-track', ...edgeDefaults },
  // Decision to tracks
  {
    id: 'e6',
    source: 'choose-track',
    target: 'protocol',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: '#6366f1' },
  },
  {
    id: 'e7',
    source: 'choose-track',
    target: 'application',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: '#ec4899' },
  },
  {
    id: 'e8',
    source: 'choose-track',
    target: 'infrastructure',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: '#f97316' },
  },
  {
    id: 'e9',
    source: 'choose-track',
    target: 'mining',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: '#14b8a6' },
  },
];
