import React from 'react';
import styles from './roadmapSvg.module.css';

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
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; kind?: 'yellow' | 'white' | 'gray' | 'faded'; fs?: number;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;

  const fill   = kind === 'yellow' ? YELLOW : kind === 'gray' ? GRAY_BG : WHITE;
  const stroke = kind === 'yellow' ? YELLOW_BDR : kind === 'faded' ? GRAY_BDR : NODE_BDR;
  const sw     = kind === 'yellow' ? 2 : 1.5;
  const color  = kind === 'faded' ? TEXT_MUTED : TEXT_DARK;
  const op     = kind === 'faded' ? 0.5 : 1;

  // Split label into max 2 lines
  const words = label.split(' ');
  const lines: string[] = words.length > 3
    ? [words.slice(0, Math.ceil(words.length / 2)).join(' '),
       words.slice(Math.ceil(words.length / 2)).join(' ')]
    : [label];
  const lh     = fs * 1.35;
  const startY = cy - ((lines.length - 1) * lh) / 2;

  return (
    <g opacity={op}>
      <rect x={x} y={y} width={w} height={h} rx={7} ry={7}
        fill={fill} stroke={stroke} strokeWidth={sw} />
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

  // ── FUNDAMENTALS ─────────────────────────────────────────────────────────────
  const FUND_Y0   = 80;
  const STEP      = NH + GAP;
  const fundItems = [
    'Prerequisites',
    'Bitcoin Fundamentals',
    'Bitcoin Architecture',
    'P2P Network',
    'Basic Development',
  ];
  const fundYs = fundItems.map((_, i) => FUND_Y0 + i * STEP);

  // ── DECISION ──────────────────────────────────────────────────────────────────
  const DW    = 230;
  const DEC_Y = fundYs.at(-1)! + NH + 38;
  const DEC_X = CX_FUND - DW / 2;

  // ── TRACK HEADERS ─────────────────────────────────────────────────────────────
  const TW      = 195;
  const TRACK_Y = DEC_Y + NH + 58;

  const trackLabels = [
    'Protocol\nDeveloper',
    'Application\nDeveloper',
    'Infrastructure\nDeveloper',
    'Mining\nDeveloper',
  ];

  // ── PROTOCOL SUB-TOPICS ───────────────────────────────────────────────────────
  const PROTO_Y0 = TRACK_Y + NH + 10 + 28;

  const protoTopics = [
    'Bitcoin Core Internals',
    'Code Architecture',
    'Consensus Mechanisms',
    'Languages & Tools',
    'Testing',
    'BIPs',
    'Specialization Areas',
    'Security & Cryptography',
    'Contributing to Core',
  ];

  // ── APPLICATION SUB-TOPICS ────────────────────────────────────────────────────
  const APP_Y0 = TRACK_Y + NH + 10 + 28;

  const appTopics = [
    'Libraries & SDKs',
    'JavaScript / TypeScript',
    'Python',
    'Rust',
    'Go',
    'Wallet Development',
    'Payment Processing',
    'Exchange & Trading',
    'Web3 on Bitcoin',
    'Advanced Protocols',
    'Protocols on Bitcoin',
  ];

  // ── INFRASTRUCTURE SUB-TOPICS ─────────────────────────────────────────────────
  const INFRA_Y0 = TRACK_Y + NH + 10 + 28;

  const infraTopics: { label: string }[] = [
    { label: 'Block Explorers' },
    { label: 'Blockchain Indexers' },
    { label: 'Node Infrastructure' },
    { label: 'APIs & Data Services' },
    { label: 'Monitoring & DevOps' },
  ];

  // ── MINING SUB-TOPICS ─────────────────────────────────────────────────────────
  const MINE_Y0 = TRACK_Y + NH + 10 + 28;

  const mineTopics: { label: string }[] = [
    { label: 'Stratum Protocol' },
    { label: 'Mining Pool Software' },
    { label: 'ASIC Firmware' },
    { label: 'Performance Optimization' },
    { label: 'Mining Analytics' },
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
  const crossItems = ['Security', 'Privacy', 'Sidechains & L2', 'Smart Contracts'];
  const CROSS_PAD  = 40;
  const CROSS_W    = (W - CROSS_PAD * 2 - (crossItems.length - 1) * 12) / crossItems.length;

  return (
    <div className={styles.svgContainer}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%"
        style={{ display: 'block', maxWidth: W }}
        xmlns="http://www.w3.org/2000/svg">

        {/* Background */}
        <rect x={0} y={0} width={W} height={H} fill={WHITE} />

        {/* ── TITLE ────────────────────────────────────────────────────────── */}
        <text x={W / 2} y={50} textAnchor="middle" fill={TEXT_DARK}
          fontFamily={FONT} fontSize={28} fontWeight={700} letterSpacing={-0.5}>
          Bitcoin Developer
        </text>

        {/* ── FUNDAMENTALS ─────────────────────────────────────────────────── */}
        {fundItems.map((label, i) => {
          const y = fundYs[i];
          return (
            <g key={label}>
              {i > 0 && (
                <Line x1={CX_FUND} y1={fundYs[i - 1] + NH}
                      x2={CX_FUND} y2={y} />
              )}
              <Node x={FX} y={y} label={label} kind="yellow" fs={14} />
            </g>
          );
        })}

        {/* Fund → Decision */}
        <Line x1={CX_FUND} y1={fundYs.at(-1)! + NH}
              x2={CX_FUND} y2={DEC_Y} />

        {/* ── DECISION NODE ────────────────────────────────────────────────── */}
        <Node x={DEC_X} y={DEC_Y} w={DW} label="Choose Your Track"
              kind="gray" fs={15} />

        {/* ── TRACK HEADERS + connectors ───────────────────────────────────── */}
        {trackLabels.map((label, i) => {
          const tcx    = CX[i];
          const tx     = tcx - TW / 2;
          const tc     = TRACK_COLORS[i];
          const lines  = label.split('\n');
          const boxH   = NH + 4;
          const tfs    = 14;
          const lh     = tfs * 1.35;
          // Vertically center the block of lines inside the box
          const blockH  = lines.length * lh;
          const startY  = TRACK_Y + (boxH - blockH) / 2 + lh / 2;
          return (
            <g key={i}>
              <Line
                x1={CX_FUND} y1={DEC_Y + NH}
                x2={tcx}     y2={TRACK_Y}
                dashed color={tc.bg} sw={2}
              />
              <rect x={tx} y={TRACK_Y} width={TW} height={boxH}
                rx={7} ry={7} fill={tc.bg} stroke={tc.bdr} strokeWidth={2} />
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
        {protoTopics.map((label, i) => {
          const y    = topicY(PROTO_Y0, i);
          const prev = i > 0 ? topicY(PROTO_Y0, i - 1) : null;
          return (
            <g key={i}>
              {prev !== null && (
                <Line x1={CX[0]} y1={prev + NH}
                      x2={CX[0]} y2={y} dashed color={BLUE} sw={1.6} />
              )}
              <Node x={NX[0]} y={y} label={label} kind="white" fs={12} />
            </g>
          );
        })}

        {/* ── APPLICATION SUB-TOPICS ───────────────────────────────────────── */}
        {appTopics.map((label, i) => {
          const y    = topicY(APP_Y0, i);
          const prev = i > 0 ? topicY(APP_Y0, i - 1) : null;
          return (
            <g key={i}>
              {prev !== null && (
                <Line x1={CX[1]} y1={prev + NH}
                      x2={CX[1]} y2={y} dashed color={BLUE} sw={1.6} />
              )}
              <Node x={NX[1]} y={y} label={label} kind="white" fs={12} />
            </g>
          );
        })}

        {/* ── INFRASTRUCTURE SUB-TOPICS ────────────────────────────────────── */}
        {infraTopics.map((t, i) => {
          const y    = topicY(INFRA_Y0, i);
          const prev = i > 0 ? topicY(INFRA_Y0, i - 1) : null;
          return (
            <g key={i}>
              {prev !== null && (
                <Line x1={CX[2]} y1={prev + NH}
                      x2={CX[2]} y2={y} dashed color={BLUE} sw={1.6} />
              )}
              <Node x={NX[2]} y={y} label={t.label} kind="white" fs={12} />
            </g>
          );
        })}

        {/* ── MINING SUB-TOPICS ────────────────────────────────────────────── */}
        {mineTopics.map((t, i) => {
          const y    = topicY(MINE_Y0, i);
          const prev = i > 0 ? topicY(MINE_Y0, i - 1) : null;
          return (
            <g key={i}>
              {prev !== null && (
                <Line x1={CX[3]} y1={prev + NH}
                      x2={CX[3]} y2={y} dashed color={BLUE} sw={1.6} />
              )}
              <Node x={NX[3]} y={y} label={t.label} kind="white" fs={12} />
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
          CROSS-CUTTING TOPICS
        </text>
        {crossItems.map((label, i) => {
          const x = CROSS_PAD + i * (CROSS_W + 12);
          const y = CROSS_Y + 6;
          return (
            <g key={label}>
              {i > 0 && (
                <Line
                  x1={CROSS_PAD + (i - 1) * (CROSS_W + 12) + CROSS_W}
                  y1={y + NH / 2}
                  x2={x} y2={y + NH / 2}
                  dashed color={BLUE} sw={1.6}
                />
              )}
              <Node x={x} y={y} w={CROSS_W} label={label} kind="white" fs={13} />
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
            fontSize={11} dominantBaseline="middle">Main Topic</text>
          <rect x={10} y={36} width={26} height={16} rx={4}
            fill={WHITE} stroke={NODE_BDR} strokeWidth={1.5} />
          <text x={44} y={44} fill={TEXT_DARK} fontFamily={FONT}
            fontSize={11} dominantBaseline="middle">Sub-Topic</text>
          <line x1={10} y1={69} x2={36} y2={69}
            stroke={BLUE} strokeWidth={2} strokeDasharray="6 4" />
          <text x={44} y={69} fill={TEXT_DARK} fontFamily={FONT}
            fontSize={11} dominantBaseline="middle">Learning Path</text>
        </g>

      </svg>
    </div>
  );
}
