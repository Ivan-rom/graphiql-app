import styles from './ClientDescription.module.css';
import { useTranslations } from 'next-intl';
import RestIcon from '@/assets/svg/rest-api-icon.svg';
import GraphqlIcon from '@/assets/svg/graphql-icon.svg';
import HistoryIcon from '@/assets/svg/history-icon.svg';

export default function ClientDescription() {
  const t = useTranslations('HomePage.clientDescription');
  const titles: string[] = t.raw('title');
  const texts: string[] = t.raw('text');

  const icons = [<RestIcon />, <GraphqlIcon />, <HistoryIcon />];

  return (
    <div className={styles.container}>
      {titles.map((title, index) => (
        <div key={index} className={styles.clientSection}>
          <div  className={styles.clientDescription}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{texts[index]}</p>
          </div>
          <div className={styles.icon}>{icons[index]}</div>
        </div>
      ))}
    </div>
  );
}
