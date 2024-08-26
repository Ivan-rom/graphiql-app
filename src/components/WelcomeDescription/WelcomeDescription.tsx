import styles from './WelcomeDescription.module.css';
import { useTranslations } from 'next-intl';

export default function WelcomeDescription() {
  const tDescription = useTranslations('HomePage.description');
  const tList: string[] = tDescription.raw('list');

  return (
    <div className={styles.description}>
      <h2 className={styles.title}>{tDescription('title')}</h2>
      <h3 className={styles.subtitle}>{tDescription('subtitle')}</h3>
      <p className={styles.text}>{tDescription('text')}</p>
      <h3 className={styles.subtitle}>{tDescription('listSubtitle')}</h3>
      <ol className={styles.list}>
        {tList.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
