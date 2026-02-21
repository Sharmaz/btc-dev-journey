import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate
            id="homepage.tagline"
            description="The tagline of the landing page"
          >
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            <Translate
              id="homepage.cta"
              description="The call to action button"
            >
              Get Started
            </Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/roadmap">
            <Translate
              id="homepage.hero.cta.roadmap"
              description="Button to view the full roadmap"
            >
              View Roadmap
            </Translate>
          </Link>
        </div>
      </div>
      <div className={styles.heroFade} />
    </header>
  );
}

const FundamentalSteps = [
  {
    step: 1,
    title: 'Prerequisites',
    titleId: 'homepage.path.step.1.title',
    blurb: 'Programming, math, systems',
    blurbId: 'homepage.path.step.1.blurb',
    link: '/docs/fundamentals/prerequisites',
  },
  {
    step: 2,
    title: 'Bitcoin Fundamentals',
    titleId: 'homepage.path.step.2.title',
    blurb: 'History, cryptography',
    blurbId: 'homepage.path.step.2.blurb',
    link: '/docs/fundamentals/bitcoin-fundamentals',
  },
  {
    step: 3,
    title: 'Bitcoin Architecture',
    titleId: 'homepage.path.step.3.title',
    blurb: 'UTXO, transactions, Script',
    blurbId: 'homepage.path.step.3.blurb',
    link: '/docs/fundamentals/bitcoin-architecture',
  },
  {
    step: 4,
    title: 'P2P Network',
    titleId: 'homepage.path.step.4.title',
    blurb: 'Node communication, protocol',
    blurbId: 'homepage.path.step.4.blurb',
    link: '/docs/fundamentals/p2p-network',
  },
  {
    step: 5,
    title: 'Basic Development',
    titleId: 'homepage.path.step.5.title',
    blurb: 'Node setup, wallet operations',
    blurbId: 'homepage.path.step.5.blurb',
    link: '/docs/fundamentals/basic-development',
  },
];

function PathStep({step, title, titleId, blurb, blurbId, link, isLast}) {
  return (
    <Link to={link} className={clsx(styles.pathStep, isLast && styles.pathStepLast)}>
      <div className={styles.stepCircle}>{String(step).padStart(2, '0')}</div>
      <div className={styles.stepContent}>
        <div className={styles.stepTitle}>
          <Translate id={titleId}>{title}</Translate>
        </div>
        <p className={styles.stepBlurb}>
          <Translate id={blurbId}>{blurb}</Translate>
        </p>
      </div>
    </Link>
  );
}

function LearningPath() {
  return (
    <section className={styles.learningPath}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionHeading}>
            <Translate id="homepage.path.title">
              The Learning Path
            </Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.path.subtitle">
              Master these 5 fundamentals before choosing your track.
            </Translate>
          </p>
        </div>
        <div className={styles.pathSteps}>
          {FundamentalSteps.map((props, idx) => (
            <PathStep
              key={idx}
              {...props}
              isLast={idx === FundamentalSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function IconProtocol() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function IconApplication() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}

function IconInfrastructure() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25v-.75M3 13.125C3 12.504 3.504 12 4.125 12h15.75c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 16.875v-3.75Zm0-6.375C3 6.129 3.504 5.625 4.125 5.625h15.75c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 10.5V6.75Z" />
    </svg>
  );
}

function IconMining() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
  );
}

const TrackList = [
  {
    title: 'Protocol Developer',
    icon: <IconProtocol />,
    color: '#3be308',
    glow: 'rgba(59, 227, 8, 0.2)',
    description: (
      <Translate id="homepage.track.protocol">
        Work on Bitcoin Core internals, consensus rules, and protocol improvements.
      </Translate>
    ),
    link: '/docs/tracks/protocol-developer',
  },
  {
    title: 'Application Developer',
    icon: <IconApplication />,
    color: '#3be308',
    glow: 'rgba(59, 227, 8, 0.2)',
    description: (
      <Translate id="homepage.track.application">
        Build wallets, payment processors, exchanges, and Lightning apps.
      </Translate>
    ),
    link: '/docs/tracks/application-developer',
  },
  {
    title: 'Infrastructure Developer',
    icon: <IconInfrastructure />,
    color: '#3be308',
    glow: 'rgba(59, 227, 8, 0.2)',
    description: (
      <Translate id="homepage.track.infrastructure">
        Create block explorers, indexers, APIs, and node infrastructure.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#infrastructure-developer',
  },
  {
    title: 'Mining Developer',
    icon: <IconMining />,
    color: '#3be308',
    glow: 'rgba(59, 227, 8, 0.2)',
    description: (
      <Translate id="homepage.track.mining">
        Develop mining pool software, firmware, and optimization tools.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#mining-developer',
  },
];

function TrackCard({title, icon, color, glow, description, link}) {
  return (
    <Link
      to={link}
      className={styles.trackCard}
      style={{'--track-color': color, '--track-glow': glow}}
    >
      <div className={styles.trackIconWrap}>
        {icon}
      </div>
      <Heading as="h3" className={styles.trackTitle}>{title}</Heading>
      <p className={styles.trackDescription}>{description}</p>
    </Link>
  );
}

function TracksSection() {
  return (
    <section className={styles.tracks}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionHeading}>
            <Translate id="homepage.tracks.title">
              Choose Your Track
            </Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.tracks.subtitle">
              Master the fundamentals, then specialize in the area that excites you most.
            </Translate>
          </p>
        </div>
        <div className={styles.trackGrid}>
          {TrackList.map((props, idx) => (
            <TrackCard key={idx} {...props} />
          ))}
        </div>
        <div className={styles.sectionCta}>
          <Link
            className="button button--primary button--lg"
            to="/docs/roadmap">
            <Translate id="homepage.tracks.cta">
              View Full Roadmap
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <LearningPath />
        <TracksSection />
      </main>
    </Layout>
  );
}
