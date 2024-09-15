import styles from './WelcomeDescription.module.css';
import { useTranslations } from 'next-intl';

export default function WelcomeDescription() {
  const tDescription = useTranslations('HomePage.description');
  const tList: string[] = tDescription.raw('list');

  return (
    <div className={styles.description}>
      <p className={styles.text}>{tDescription('text')}</p>
      <h3 className={styles.subtitle}>{tDescription('listSubtitle')}</h3>
      <ul className={styles.list}>
        {tList.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
