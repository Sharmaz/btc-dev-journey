import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: (
      <Translate>
        Start with the basis
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate>
        Do you already know what is a node and which kind of nodes exist? or what is the difference between mainnet, testnet and regtest?.
      </Translate>
    ),
  },
  {
    title: (
      <Translate>
        Configure a node on your PC
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate>
        Learn step by step how to install, configure and run a bitcoin and lightning network node.
      </Translate>
    ),
  },
  {
    title: (
      <Translate>
        Create your first application
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate>
        If you already have your node running and your development environment we will go what follows. Let's create applications.
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
