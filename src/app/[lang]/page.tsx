'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ClientDescription from '@/components/ClientsDescription/ClientDescription.tsx';
import AboutUs from '@/components/AboutUs/AboutUs.tsx';

export default function Home() {
  const t = useTranslations('HomePage');
  const [user] = useAuthState(auth);
  const isAuthorized = !!user;
  const userName = user?.displayName || null;

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <h1 className={styles.appName}>RestQL App</h1>
          <h2 className={styles.title}>{isAuthorized ? `${t('welcome')}, ${userName}!` : `${t('welcome')}!`}</h2>
          <NavigationLinks isAuthLinks={isAuthorized} />
        </div>
        <WelcomeDescription />
        <ClientDescription />
        <AboutUs />
      </div>
    </section>
  );
}
