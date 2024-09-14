'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [user, loading, error] = useAuthState(auth);
  const isAuthorized = !!user;
  const userName = user?.displayName || null;

  useEffect(() => {
    if (error) {
      toast(error.message);
    }
  }, [error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        <h1 className={styles.title}>{isAuthorized ? t('welcomeBack') + userName : t('welcomeBack')}</h1>
        <NavigationLinks isAuthLinks={isAuthorized} />
        <WelcomeDescription />
      </div>
    </section>
  );
}
