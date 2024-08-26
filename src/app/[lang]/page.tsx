'use client';

import { useTranslations } from 'next-intl';
import styles from './layout.module.css';
import { RoutesKeys } from '@/components/NavigationLinks/NavigationLinks';
import WelcomeDescription from '@/components/WelcomeDescription/WelcomeDescription';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const t = useTranslations('HomePage');
  const [user, loading, error] = useAuthState(auth);
  const isAuthorized = !!user;
  const userName = user?.displayName || null;

  const mainLinks = [
    { href: 'restApi', label: t('mainLinks.restApi') },
    { href: 'graphiQL', label: t('mainLinks.graphiQL') },
    { href: 'history', label: t('mainLinks.history') },
  ] as { href: RoutesKeys; label: string }[];

  const authLinks = [
    { href: 'signUp', label: t('authLinks.signUp') },
    { href: 'signIn', label: t('authLinks.signIn') },
  ] as { href: RoutesKeys; label: string }[];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main>
      <section className={styles.welcome}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            {isAuthorized ? t('welcomeBack') + userName : t('welcomeBack')}
          </h1>
          <NavigationLinks
            links={isAuthorized ? mainLinks : authLinks}
            isAuthLinks={!isAuthorized}
          />
          <WelcomeDescription />
        </div>
      </section>
    </main>
  );
}
