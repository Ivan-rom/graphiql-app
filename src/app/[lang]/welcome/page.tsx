'use client';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import WelcomeScreen from '@/components/WelcomeScreen/WelcomeScreen.tsx';
import { Routes } from '@/helpers/enums.ts';

export default function Welcome() {
  const t = useTranslations();
  const isAuthenticated = true;
  const userName = 'User Userovich';

  return (
    <section className={styles.welcome}>
      <WelcomeScreen
        title={
          isAuthenticated
            ? t('HomePage.welcomeBack')
            : t('HomePage.title')
        }
        description={
          isAuthenticated
            ? t('HomePage.description')
            : t('HomePage.unauthorized')
        }
        isAuthenticated={isAuthenticated}
        userName={isAuthenticated ? userName : null}
        links={
          isAuthenticated
            ? []
            : [
                { href: Routes.signIn, title: t('SignIn.title') },
                { href: Routes.signUp, title: t('SignUp.title') },
              ]
        }
      />
    </section>
  );
}
