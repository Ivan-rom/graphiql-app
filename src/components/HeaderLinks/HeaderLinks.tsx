'use client';

import styles from './HeaderLinks.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useRouter, usePathname } from '@/helpers/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useTranslations } from 'next-intl';
import { authLinks } from '@/helpers/constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/helpers/enums';
import { Link } from '@/helpers/navigation';
import cn from 'classnames';

function HeaderLinks() {
  const t = useTranslations('HomePage');

  const [user] = useAuthState(auth);
  const isAuthorized = !!user;

  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace(Routes.home);
  };

  const isActiveLink = (href: string) => {
    return pathName === href;
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
            className={cn(sharedStyles.link, styles.link, {
              [styles.active]: isActiveLink(href),
            })}
          >
            {t(label)}
          </Link>
        ))
      )}
    </div>
  );
}

export default HeaderLinks;
