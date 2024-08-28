'use client';

import styles from './HeaderButtons.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useRouter } from '@/helpers/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useTranslations } from 'next-intl';
import { authLinks } from '@/helpers/constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/helpers/enums';

function HeaderButtons() {
  const t = useTranslations('HomePage');

  const [user] = useAuthState(auth);
  const isAuthorized = !!user;

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace(Routes.home);
  };

  const clickHandler = async (href: Routes) => {
    router.push(href);
  };

  return (
    <div className={styles.buttonsWrapper}>
      {isAuthorized ? (
        <button onClick={handleLogout} className={sharedStyles.button}>
          {t('logOut')}
        </button>
      ) : (
        authLinks.map(({ href, label }, index) => (
          <button
            key={index}
            className={sharedStyles.button}
            onClick={() => clickHandler(href)}
          >
            {t(label)}
          </button>
        ))
      )}
    </div>
  );
}

export default HeaderButtons;
