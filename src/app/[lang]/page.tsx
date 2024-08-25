import { useTranslations } from 'next-intl';
import styles from './layout.module.css';
import { Link } from '@/helpers/navigation';
import { Routes } from '@/helpers/enums';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';

export default function Home() {
  const t = useTranslations('HomePage');
  const isAuthorized = false;
  const userName = 'User';

  return (
    <main>
      <section className={styles.welcome}>
        <div className={styles.container}>
          {isAuthorized ? (
            <>
              <h1 className={styles.title}>
                {t('welcomeBack').concat(userName)}
              </h1>
              <WelcomeDescription />
              <div className={styles.links}>
                <Link className={styles.link} href={'#'}>
                  {t('mainLinks.restApi')}
                </Link>
                <Link href={'#'} className={styles.link}>
                  {t('mainLinks.graphiQL')}
                </Link>
                <Link className={styles.link} href={'#'}>
                  {t('mainLinks.history')}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.text}>{t('unauthorized')}</p>
              <div className={styles.links}>
                <Link
                  className={styles.link}
                  href={Routes.signUp}
                  prefetch={false}
                >
                  {t('authLinks.signUp')}
                </Link>
                <Link
                  className={styles.link}
                  href={Routes.signIn}
                  prefetch={false}
                >
                  {t('authLinks.signIn')}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
