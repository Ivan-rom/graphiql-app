'use client';

import styles from './Header.module.css';
import HeaderLinks from '@/components/HeaderLinks/HeaderLinks.tsx';
import { Link } from '@/helpers/navigation';
import LanguageToggler from '@/components/LanguageToggler/LanguageToggler';
import { Routes } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Header() {
  const [isFixed, setFixed] = useState(false);

  const headerStyles = {
    [styles.fixed]: isFixed,
  };

  useEffect(() => {
    const handleScroll = () => {
      setFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={classNames(styles.header, headerStyles)}>
      <div className={styles.container}>
        <Link href={Routes.home} className={styles.logo}>
          Unit
        </Link>
        <div className={styles.controls}>
          <HeaderLinks />
          <LanguageToggler />
        </div>
      </div>
    </header>
  );
}
