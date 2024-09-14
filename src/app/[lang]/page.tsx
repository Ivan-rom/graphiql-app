'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const t = useTranslations('HomePage');
  const [user, loading, error] = useAuthState(auth);
  const isAuthorized = !!user;
  const userName = user?.displayName || null;

  if (loading) {
    return <p className={styles.loader}>{t('loading')}</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        <h1 className={styles.appName}>RestQL App</h1>
        <h2 className={styles.title}>{isAuthorized ? t('welcome') + `, ${userName}!` : `${t('welcome')}!`}</h2>
        <NavigationLinks isAuthLinks={isAuthorized} />
        <WelcomeDescription />
      </div>
    </section>
  );
}
