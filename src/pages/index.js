import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          <Translate
            id="homepage.tagline"
            description="The tagline of the landing page"
          >
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
              <Translate
                id='homepage.cta'
                description="The call to action button"
              >
                Get Started
              </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

const TrackList = [
  {
    title: 'Protocol Developer',
    emoji: '\u2699\ufe0f',
    color: '#6366f1',
    description: (
      <Translate id="homepage.track.protocol">
        Work on Bitcoin Core internals, consensus rules, and protocol improvements.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#protocol-developer',
  },
  {
    title: 'Application Developer',
    emoji: '\ud83d\udcf1',
    color: '#ec4899',
    description: (
      <Translate id="homepage.track.application">
        Build wallets, payment processors, exchanges, and Lightning apps.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#application-developer',
  },
  {
    title: 'Infrastructure Developer',
    emoji: '\ud83c\udfd7\ufe0f',
    color: '#f97316',
    description: (
      <Translate id="homepage.track.infrastructure">
        Create block explorers, indexers, APIs, and node infrastructure.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#infrastructure-developer',
  },
  {
    title: 'Mining Developer',
    emoji: '\u26cf\ufe0f',
    color: '#14b8a6',
    description: (
      <Translate id="homepage.track.mining">
        Develop mining pool software, firmware, and optimization tools.
      </Translate>
    ),
    link: '/docs/roadmap/developer-types#mining-developer',
  },
];

function TrackCard({title, emoji, color, description, link}) {
  return (
    <div className={clsx('col col--3')}>
      <Link to={link} className={styles.trackCard} style={{borderColor: color}}>
        <span className={styles.trackEmoji}>{emoji}</span>
        <Heading as="h3" className={styles.trackTitle}>{title}</Heading>
        <p className={styles.trackDescription}>{description}</p>
      </Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.tracks}>
          <div className="container">
            <Heading as="h2" className={styles.tracksHeading}>
              <Translate id="homepage.tracks.title">
                Choose Your Track
              </Translate>
            </Heading>
            <p className={styles.tracksSubtitle}>
              <Translate id="homepage.tracks.subtitle">
                Master the fundamentals, then specialize in the area that excites you most.
              </Translate>
            </p>
            <div className="row">
              {TrackList.map((props, idx) => (
                <TrackCard key={idx} {...props} />
              ))}
            </div>
            <div className={styles.buttons} style={{marginTop: '2rem'}}>
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
      </main>
    </Layout>
  );
}
