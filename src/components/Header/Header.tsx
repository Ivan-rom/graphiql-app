'use client';

import styles from './Header.module.css';
import HeaderButtons from '@/components/HeaderButtons/HeaderButtons';
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
      if (window.scrollY > 0) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={classNames(styles.header, headerStyles)}>
      <Link href={Routes.home} className={styles.logo}>
        Unit
      </Link>
      <div className={styles.buttons}>
        <HeaderButtons />
        <LanguageToggler />
      </div>
    </header>
  );
}
