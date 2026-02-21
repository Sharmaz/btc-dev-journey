import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './roadmapSvg.module.css';
import RoadmapDrawer from './RoadmapDrawer';

// ─── Design tokens (roadmap.sh palette) ───────────────────────────────────────
const YELLOW     = '#F4D03F';
const YELLOW_BDR = '#d4ac0d';
const WHITE      = '#ffffff';
const NODE_BDR   = '#333333';
const BLUE       = '#2B78E4';
const GRAY_BG    = '#e8e8e8';
const GRAY_BDR   = '#b0b0b0';
const TEXT_DARK  = '#1a1a1a';
const TEXT_MUTED = '#888888';
const FONT       = 'Arial, system-ui, sans-serif';

// ─── Canvas width (height is calculated dynamically inside the component) ─────
const W = 1100;

// ─── Node dimensions ──────────────────────────────────────────────────────────
const NW  = 210;   // standard node width
const NH  = 44;    // standard node height
const GAP = 14;    // vertical gap between stacked nodes

// ─── Column layout (4 equal columns across W) ─────────────────────────────────
// Each column is W/4 = 275px wide; centers at 275/2 + col*275
const COL_W   = W / 4;                              // 275
const CX      = [0, 1, 2, 3].map(i => Math.round(COL_W / 2 + i * COL_W));
// CX = [137, 412, 687, 962]
const NX      = CX.map(cx => cx - NW / 2);

// Fundamentals centered in full width
const CX_FUND = W / 2;  // 550
const FX      = CX_FUND - NW / 2;

// Track colors
const TRACK_COLORS = [
  { bg: '#6366f1', bdr: '#4f46e5' },  // Protocol
  { bg: '#ec4899', bdr: '#db2777' },  // Application
  { bg: '#f97316', bdr: '#ea580c' },  // Infrastructure
  { bg: '#14b8a6', bdr: '#0d9488' },  // Mining
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Node({
  x, y, w = NW, h = NH, label, kind = 'yellow', fs = 13,
  nodeId, onNodeClick, isActive,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; kind?: 'yellow' | 'white' | 'gray' | 'faded'; fs?: number;
  nodeId?: string;
  onNodeClick?: (id: string) => void;
  isActive?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;

  const fill   = kind === 'yellow' ? YELLOW : kind === 'gray' ? GRAY_BG : WHITE;
  const stroke = isActive ? BLUE : (kind === 'yellow' ? YELLOW_BDR : kind === 'faded' ? GRAY_BDR : NODE_BDR);
  const sw     = isActive ? 2.5 : (kind === 'yellow' ? 2 : 1.5);
  const color  = kind === 'faded' ? TEXT_MUTED : TEXT_DARK;
  const op     = kind === 'faded' ? 0.5 : 1;

  const isClickable = !!nodeId && !!onNodeClick;

  // Split label into max 2 lines
  const words = label.split(' ');
  const lines: string[] = words.length > 3
    ? [words.slice(0, Math.ceil(words.length / 2)).join(' '),
       words.slice(Math.ceil(words.length / 2)).join(' ')]
    : [label];
  const lh     = fs * 1.35;
  const startY = cy - ((lines.length - 1) * lh) / 2;

  return (
    <g
      opacity={op}
      onClick={isClickable ? () => onNodeClick!(nodeId!) : undefined}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
    >
      <rect x={x} y={y} width={w} height={h} rx={7} ry={7}
        fill={fill} stroke={stroke} strokeWidth={sw} />
      {/* Wider invisible hit area for easier clicking */}
      {isClickable && (
        <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8}
          rx={9} ry={9} fill="transparent" stroke="none" />
      )}
      {lines.map((ln, i) => (
        <text key={i} x={cx} y={startY + i * lh}
          textAnchor="middle" dominantBaseline="middle"
          fill={color} fontFamily={FONT} fontSize={fs} fontWeight={500}>
          {ln}
        </text>
      ))}
    </g>
  );
}

function Line({
  x1, y1, x2, y2, dashed = false, color = BLUE, sw = 2.2,
}: {
  x1: number; y1: number; x2: number; y2: number;
  dashed?: boolean; color?: string; sw?: number;
}) {
  const d = x1 === x2
    ? `M ${x1} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} C ${x1} ${(y1 * 0.35 + y2 * 0.65)} ${x2} ${(y1 * 0.65 + y2 * 0.35)} ${x2} ${y2}`;
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={sw}
      strokeDasharray={dashed ? '7 5' : undefined} strokeLinecap="round" />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function RoadmapSVG() {

  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isEs = currentLocale === 'es';

  // ─── UI strings (translated) ────────────────────────────────────────────────
  const ui = isEs ? {
    title:         'Desarrollador Bitcoin',
    chooseTrack:   'Elige Tu Track',
    fundamentals:  ['Prerequisitos', 'Fundamentos de Bitcoin', 'Arquitectura de Bitcoin', 'Red P2P', 'Desarrollo Básico'],
    tracks:        ['Desarrollador\nde Protocolo', 'Desarrollador\nde Aplicaciones', 'Desarrollador\nde Infraestructura', 'Desarrollador\nde Minería'],
    crossLabel:    'TEMAS TRANSVERSALES',
    legendMain:    'Tema Principal',
    legendSub:     'Sub-Tema',
    legendPath:    'Ruta de Aprendizaje',
  } : {
    title:         'Bitcoin Developer',
    chooseTrack:   'Choose Your Track',
    fundamentals:  ['Prerequisites', 'Bitcoin Fundamentals', 'Bitcoin Architecture', 'P2P Network', 'Basic Development'],
    tracks:        ['Protocol\nDeveloper', 'Application\nDeveloper', 'Infrastructure\nDeveloper', 'Mining\nDeveloper'],
    crossLabel:    'CROSS-CUTTING TOPICS',
    legendMain:    'Main Topic',
    legendSub:     'Sub-Topic',
    legendPath:    'Learning Path',
  };

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── FUNDAMENTALS ─────────────────────────────────────────────────────────────
  const FUND_Y0   = 80;
  const STEP      = NH + GAP;
  const fundItems = [
    { label: ui.fundamentals[0], id: 'prerequisites' },
    { label: ui.fundamentals[1], id: 'bitcoin-fundamentals' },
    { label: ui.fundamentals[2], id: 'bitcoin-architecture' },
    { label: ui.fundamentals[3], id: 'p2p-network' },
    { label: ui.fundamentals[4], id: 'basic-development' },
  ];
  const fundYs = fundItems.map((_, i) => FUND_Y0 + i * STEP);

  // ── DECISION ──────────────────────────────────────────────────────────────────
  const DW    = 230;
  const DEC_Y = fundYs.at(-1)! + NH + 38;
  const DEC_X = CX_FUND - DW / 2;

  // ── TRACK HEADERS ─────────────────────────────────────────────────────────────
  const TW      = 195;
  const TRACK_Y = DEC_Y + NH + 58;

  const trackItems = [
    { label: ui.tracks[0], id: 'protocol-developer' },
    { label: ui.tracks[1], id: 'application-developer' },
    { label: ui.tracks[2], id: 'infrastructure-developer' },
    { label: ui.tracks[3], id: 'mining-developer' },
  ];

  // ── PROTOCOL SUB-TOPICS ───────────────────────────────────────────────────────
  const PROTO_Y0 = TRACK_Y + NH + 10 + 28;

  const protoTopics = [
    { label: 'Bitcoin Core Internals', id: 'bitcoin-core-internals' },
    { label: 'Code Architecture',      id: 'code-architecture' },
    { label: 'Consensus Mechanisms',   id: 'consensus-mechanisms' },
    { label: 'Languages & Tools',      id: 'proto-languages-tools' },
    { label: 'Testing',                id: 'proto-testing' },
    { label: 'BIPs',                   id: 'bips' },
    { label: 'Specialization Areas',   id: 'specialization-areas' },
    { label: 'Security & Cryptography', id: 'security-cryptography' },
    { label: 'Contributing to Core',   id: 'contributing-to-core' },
  ];

  // ── APPLICATION SUB-TOPICS ────────────────────────────────────────────────────
  const APP_Y0 = TRACK_Y + NH + 10 + 28;

  const appTopics = [
    { label: 'Libraries & SDKs',      id: 'libraries-sdks' },
    { label: 'JavaScript / TypeScript', id: 'js-typescript' },
    { label: 'Python',                 id: 'python' },
    { label: 'Rust',                   id: 'rust' },
    { label: 'Go',                     id: 'go' },
    { label: 'Wallet Development',     id: 'wallet-development' },
    { label: 'Payment Processing',     id: 'payment-processing' },
    { label: 'Exchange & Trading',     id: 'exchange-trading' },
    { label: 'Web3 on Bitcoin',        id: 'web3-bitcoin' },
    { label: 'Advanced Protocols',     id: 'advanced-protocols' },
    { label: 'Protocols on Bitcoin',   id: 'protocols-on-bitcoin' },
  ];

  // ── INFRASTRUCTURE SUB-TOPICS ─────────────────────────────────────────────────
  const INFRA_Y0 = TRACK_Y + NH + 10 + 28;

  const infraTopics = [
    { label: 'Block Explorers',      id: 'block-explorers' },
    { label: 'Blockchain Indexers',  id: 'blockchain-indexers' },
    { label: 'Node Infrastructure',  id: 'node-infrastructure' },
    { label: 'APIs & Data Services', id: 'apis-data-services' },
    { label: 'Monitoring & DevOps',  id: 'monitoring-devops' },
  ];

  // ── MINING SUB-TOPICS ─────────────────────────────────────────────────────────
  const MINE_Y0 = TRACK_Y + NH + 10 + 28;

  const mineTopics = [
    { label: 'Stratum Protocol',         id: 'stratum-protocol' },
    { label: 'Mining Pool Software',     id: 'mining-pool-software' },
    { label: 'ASIC Firmware',            id: 'asic-firmware' },
    { label: 'Performance Optimization', id: 'performance-optimization' },
    { label: 'Mining Analytics',         id: 'mining-analytics' },
  ];

  // Helper: y position for sub-topic i
  const topicY = (y0: number, i: number) => y0 + i * STEP;

  // Bottom of each column
  const protoBottom = PROTO_Y0 + protoTopics.length * STEP;
  const appBottom   = APP_Y0   + appTopics.length   * STEP;
  const infraBottom = INFRA_Y0 + infraTopics.length * STEP;
  const mineBottom  = MINE_Y0  + mineTopics.length  * STEP;

  // ── CROSS-CUTTING TOPICS ──────────────────────────────────────────────────────
  const CROSS_Y    = Math.max(protoBottom, appBottom, infraBottom, mineBottom) + 60;
  // Dynamic canvas height: cross-cutting bottom + padding
  const H = CROSS_Y + NH + 50;
  const crossItems = [
    { label: 'Security',        id: 'cross-security' },
    { label: 'Privacy',         id: 'cross-privacy' },
    { label: 'Sidechains & L2', id: 'sidechains-l2' },
    { label: 'Smart Contracts', id: 'smart-contracts' },
  ];
  const CROSS_PAD  = 40;
  const CROSS_W    = (W - CROSS_PAD * 2 - (crossItems.length - 1) * 12) / crossItems.length;

  return (
    <>
      <RoadmapDrawer nodeId={activeId} onClose={() => setActiveId(null)} />

      <div className={styles.svgContainer}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%"
          style={{ display: 'block', maxWidth: W }}
          xmlns="http://www.w3.org/2000/svg">

          {/* Background */}
          <rect x={0} y={0} width={W} height={H} fill={WHITE} />

          {/* ── TITLE ────────────────────────────────────────────────────────── */}
          <text x={W / 2} y={50} textAnchor="middle" fill={TEXT_DARK}
            fontFamily={FONT} fontSize={28} fontWeight={700} letterSpacing={-0.5}>
            {ui.title}
          </text>

          {/* ── FUNDAMENTALS ─────────────────────────────────────────────────── */}
          {fundItems.map((item, i) => {
            const y = fundYs[i];
            return (
              <g key={item.id}>
                {i > 0 && (
                  <Line x1={CX_FUND} y1={fundYs[i - 1] + NH}
                        x2={CX_FUND} y2={y} />
                )}
                <Node x={FX} y={y} label={item.label} kind="yellow" fs={14}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* Fund → Decision */}
          <Line x1={CX_FUND} y1={fundYs.at(-1)! + NH}
                x2={CX_FUND} y2={DEC_Y} />

          {/* ── DECISION NODE ────────────────────────────────────────────────── */}
          <Node x={DEC_X} y={DEC_Y} w={DW} label={ui.chooseTrack}
                kind="gray" fs={15}
                nodeId="choose-your-track" onNodeClick={handleNodeClick}
                isActive={activeId === 'choose-your-track'} />

          {/* ── TRACK HEADERS + connectors ───────────────────────────────────── */}
          {trackItems.map((item, i) => {
            const tcx    = CX[i];
            const tx     = tcx - TW / 2;
            const tc     = TRACK_COLORS[i];
            const lines  = item.label.split('\n');
            const boxH   = NH + 4;
            const tfs    = 14;
            const lh     = tfs * 1.35;
            // Vertically center the block of lines inside the box
            const blockH  = lines.length * lh;
            const startY  = TRACK_Y + (boxH - blockH) / 2 + lh / 2;
            const isTrackActive = activeId === item.id;
            return (
              <g key={i}
                onClick={() => handleNodeClick(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <Line
                  x1={CX_FUND} y1={DEC_Y + NH}
                  x2={tcx}     y2={TRACK_Y}
                  dashed color={tc.bg} sw={2}
                />
                <rect x={tx} y={TRACK_Y} width={TW} height={boxH}
                  rx={7} ry={7}
                  fill={tc.bg}
                  stroke={isTrackActive ? BLUE : tc.bdr}
                  strokeWidth={isTrackActive ? 2.5 : 2} />
                {lines.map((ln, li) => (
                  <text key={li}
                    x={tcx}
                    y={startY + li * lh}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={WHITE} fontFamily={FONT} fontSize={tfs} fontWeight={700}>
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Vertical connectors from track headers down */}
          {[
            { cx: CX[0], y0: PROTO_Y0,  color: '#6366f1' },
            { cx: CX[1], y0: APP_Y0,    color: '#ec4899' },
            { cx: CX[2], y0: INFRA_Y0,  color: '#f97316' },
            { cx: CX[3], y0: MINE_Y0,   color: '#14b8a6' },
          ].map(({ cx, y0, color }) => (
            <Line key={cx} x1={cx} y1={TRACK_Y + NH + 4}
                  x2={cx} y2={y0} color={color} sw={2} />
          ))}

          {/* ── PROTOCOL SUB-TOPICS ──────────────────────────────────────────── */}
          {protoTopics.map((item, i) => {
            const y    = topicY(PROTO_Y0, i);
            const prev = i > 0 ? topicY(PROTO_Y0, i - 1) : null;
            return (
              <g key={item.id}>
                {prev !== null && (
                  <Line x1={CX[0]} y1={prev + NH}
                        x2={CX[0]} y2={y} dashed color={BLUE} sw={1.6} />
                )}
                <Node x={NX[0]} y={y} label={item.label} kind="white" fs={12}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* ── APPLICATION SUB-TOPICS ───────────────────────────────────────── */}
          {appTopics.map((item, i) => {
            const y    = topicY(APP_Y0, i);
            const prev = i > 0 ? topicY(APP_Y0, i - 1) : null;
            return (
              <g key={item.id}>
                {prev !== null && (
                  <Line x1={CX[1]} y1={prev + NH}
                        x2={CX[1]} y2={y} dashed color={BLUE} sw={1.6} />
                )}
                <Node x={NX[1]} y={y} label={item.label} kind="white" fs={12}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* ── INFRASTRUCTURE SUB-TOPICS ────────────────────────────────────── */}
          {infraTopics.map((item, i) => {
            const y    = topicY(INFRA_Y0, i);
            const prev = i > 0 ? topicY(INFRA_Y0, i - 1) : null;
            return (
              <g key={item.id}>
                {prev !== null && (
                  <Line x1={CX[2]} y1={prev + NH}
                        x2={CX[2]} y2={y} dashed color={BLUE} sw={1.6} />
                )}
                <Node x={NX[2]} y={y} label={item.label} kind="white" fs={12}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* ── MINING SUB-TOPICS ────────────────────────────────────────────── */}
          {mineTopics.map((item, i) => {
            const y    = topicY(MINE_Y0, i);
            const prev = i > 0 ? topicY(MINE_Y0, i - 1) : null;
            return (
              <g key={item.id}>
                {prev !== null && (
                  <Line x1={CX[3]} y1={prev + NH}
                        x2={CX[3]} y2={y} dashed color={BLUE} sw={1.6} />
                )}
                <Node x={NX[3]} y={y} label={item.label} kind="white" fs={12}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* ── CROSS-CUTTING TOPICS ─────────────────────────────────────────── */}
          <line x1={CROSS_PAD} y1={CROSS_Y - 26}
                x2={W - CROSS_PAD} y2={CROSS_Y - 26}
                stroke={GRAY_BDR} strokeWidth={1} strokeDasharray="5 4" />
          <text x={W / 2} y={CROSS_Y - 10}
            textAnchor="middle" fill={TEXT_MUTED}
            fontFamily={FONT} fontSize={11} fontWeight={700} letterSpacing={1.5}>
            {ui.crossLabel}
          </text>
          {crossItems.map((item, i) => {
            const x = CROSS_PAD + i * (CROSS_W + 12);
            const y = CROSS_Y + 6;
            return (
              <g key={item.id}>
                {i > 0 && (
                  <Line
                    x1={CROSS_PAD + (i - 1) * (CROSS_W + 12) + CROSS_W}
                    y1={y + NH / 2}
                    x2={x} y2={y + NH / 2}
                    dashed color={BLUE} sw={1.6}
                  />
                )}
                <Node x={x} y={y} w={CROSS_W} label={item.label} kind="white" fs={13}
                  nodeId={item.id} onNodeClick={handleNodeClick}
                  isActive={activeId === item.id} />
              </g>
            );
          })}

          {/* ── LEGEND ───────────────────────────────────────────────────────── */}
          <g transform={`translate(${W - 186}, 68)`}>
            <rect x={0} y={0} width={168} height={84} rx={7}
              fill={GRAY_BG} stroke={GRAY_BDR} strokeWidth={1} />
            <rect x={10} y={12} width={26} height={16} rx={4}
              fill={YELLOW} stroke={YELLOW_BDR} strokeWidth={1.5} />
            <text x={44} y={20} fill={TEXT_DARK} fontFamily={FONT}
              fontSize={11} dominantBaseline="middle">{ui.legendMain}</text>
            <rect x={10} y={36} width={26} height={16} rx={4}
              fill={WHITE} stroke={NODE_BDR} strokeWidth={1.5} />
            <text x={44} y={44} fill={TEXT_DARK} fontFamily={FONT}
              fontSize={11} dominantBaseline="middle">{ui.legendSub}</text>
            <line x1={10} y1={69} x2={36} y2={69}
              stroke={BLUE} strokeWidth={2} strokeDasharray="6 4" />
            <text x={44} y={69} fill={TEXT_DARK} fontFamily={FONT}
              fontSize={11} dominantBaseline="middle">{ui.legendPath}</text>
          </g>

        </svg>
      </div>
    </>
  );
}
