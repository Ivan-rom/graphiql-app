import { useTranslations } from 'next-intl';
import styles from './layout.module.css';
import Link from 'next/link';
import { Routes } from '@/helpers/enums';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';

export default function Home() {
  const t = useTranslations();
  const isAuthorized = false;
  const userName = 'User';

  return (
    <main>
      <section className={styles.welcome}>
        <div className={styles.container}>
          {isAuthorized ? (
            <>
              <h1 className={styles.title}>
                {t('HomePage.welcomeBack').concat(userName)}
              </h1>
              <WelcomeDescription />
              <div className={styles.links}>
                <Link className={styles.link} href={'#'}>
                  {t('HomePage.mainLinks.restApi')}
                </Link>
                <Link href={'#'} className={styles.link}>
                  {t('HomePage.mainLinks.graphiQL')}
                </Link>
                <Link className={styles.link} href={'#'}>
                  {t('HomePage.mainLinks.history')}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.title}>{t('HomePage.title')}</h1>
              <p className={styles.text}>{t('HomePage.unauthorized')}</p>
              <div className={styles.links}>
                <Link
                  className={styles.link}
                  href={Routes.signUp}
                  prefetch={false}
                >
                  {t('HomePage.authLinks.signUp')}
                </Link>
                <Link
                  className={styles.link}
                  href={Routes.signIn}
                  prefetch={false}
                >
                  {t('HomePage.authLinks.signIn')}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
