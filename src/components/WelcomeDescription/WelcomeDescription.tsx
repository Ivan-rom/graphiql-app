import styles from './WelcomeDescription.module.css';
import { useTranslations } from 'next-intl';

export default function WelcomeDescription() {
  const tDescription = useTranslations('HomePage.description');
  const tList = tDescription.raw('list') as string[];
  const tSecondList = tDescription.raw('secondList') as string[];
  return (
    <div className={styles.description}>
      <h2 className={styles.title}>{tDescription('title')}</h2>
      <h3 className={styles.subtitle}>{tDescription('subtitle')}</h3>
      <p className={styles.text}>{tDescription('text')}</p>
      <h3 className={styles.subtitle}>{tDescription('listSubtitle')}</h3>
      <ol className={styles.list}>
        {tList.map((item: string, index: number) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ol>
      <h3 className={styles.subtitle}>{tDescription('secondListSubtitle')}</h3>
      <ul className={styles.list}>
        {tSecondList.map((item: string, index: number) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
