'use client';

import styles from './HeaderLinks.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useRouter } from '@/helpers/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useTranslations } from 'next-intl';
import { authLinks } from '@/helpers/constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/helpers/enums';
import { Link } from '@/helpers/navigation';

function HeaderLinks() {
  const t = useTranslations('HomePage');

  const [user] = useAuthState(auth);
  const isAuthorized = !!user;

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace(Routes.home);
  };

  return (
    <div className={styles.linksWrapper}>
      {isAuthorized ? (
        <button onClick={handleLogout} className={sharedStyles.button}>
          {t('logOut')}
        </button>
      ) : (
        authLinks.map(({ href, label }, index) => (
          <Link
            key={index}
            href={href}
            prefetch={false}
            className={sharedStyles.link}
          >
            {t(label)}
          </Link>
        ))
      )}
    </div>
  );
}

export default HeaderLinks;
