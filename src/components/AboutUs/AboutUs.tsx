import styles from './AboutUs.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/helpers/navigation.ts';
type Member = {
  name: string;
  role: string;
  github: string;
};

export default function AboutUs() {
  const t = useTranslations('HomePage.aboutUs');

  const tTeam = t.raw('members') as Member[];

  return (
    <div className={styles.aboutUs}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.text}>{t('text')}</p>
      <h3 className={styles.subtitle}>{t('subtitle')}</h3>
      <ul className={styles.list}>
        {tTeam.map((member, index) => (
          <li key={index} className={styles.listItem}>
            <Link className={`${sharedStyles.link} ${styles.link}`} href={member.github} target="_blank">
              {member.name}
            </Link>{' '}
            - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
