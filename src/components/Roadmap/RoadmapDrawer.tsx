import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './roadmapDrawer.module.css';
import { NODE_DATA } from './svgRoadmapData';

type Props = {
  nodeId: string | null;
  onClose: () => void;
};

export default function RoadmapDrawer({ nodeId, onClose }: Props) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isEs = currentLocale === 'es';

  const data = nodeId ? NODE_DATA[nodeId] : null;
  const title       = data ? (isEs && data.titleEs ? data.titleEs : data.title) : null;
  const description = data ? (isEs ? data.descriptionEs : data.description) : null;

  const learnMore    = isEs ? 'Aprende más'  : 'Learn more';
  const closeLabel   = isEs ? 'Cerrar panel' : 'Close panel';
  const localizeHref = (href: string) => isEs ? `/es${href}` : href;

  const warningTitle = isEs ? '⚠ No Recomendado' : '⚠ Not Recommended';
  const warningText  = isEs
    ? 'Este tema utiliza el espacio de bloques de Bitcoin para datos arbitrarios. Es ampliamente considerado spam que infla la blockchain y degrada la red. El estándar Bitcoin es claro: Bitcoin es dinero, no una capa de almacenamiento de propósito general.'
    : 'This topic uses Bitcoin block space to embed arbitrary data. It is widely considered spam that bloats the blockchain and degrades the network. The Bitcoin standard is clear: Bitcoin is money, not a general-purpose data storage layer.';

  useEffect(() => {
    if (nodeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [nodeId]);

  return (
    <>
      {nodeId && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}

      <div className={`${styles.drawer} ${nodeId ? styles.open : ''}`} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
          ✕
        </button>

        {data && (
          <div className={styles.content}>
            {data.notRecommended && (
              <div className={styles.warning}>
                <p className={styles.warningTitle}>{warningTitle}</p>
                {warningText}
              </div>
            )}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            {data.links.length > 0 && (
              <>
                <p className={styles.linksLabel}>{learnMore}</p>
                <ul className={styles.links}>
                  {data.links.map(link => (
                    <li key={link.href}>
                      <a href={localizeHref(link.href)} target="_blank" rel="noopener noreferrer">
                        {isEs ? link.labelEs : link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
