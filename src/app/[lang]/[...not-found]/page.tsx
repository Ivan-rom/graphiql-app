import { Routes } from '@/helpers/enums';
import { Link } from '@/helpers/navigation';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';

function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <section className={styles.notFound}>
      <div className={styles.wrapper}>
        <p className={styles.status}>404</p>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>
          {t('description')}
          <Link className={classNames(sharedStyles.link)} href={Routes.home}>
            {t('home-link')}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default NotFoundPage;
