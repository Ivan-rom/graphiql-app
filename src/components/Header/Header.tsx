import styles from './Header.module.css';
import HeaderButtons from '@/components/HeaderButtons/HeaderButtons';
import { Link } from '@/helpers/navigation.ts';
import LanguageToggler from '@/components/LanguageToggler/LanguageToggler';
import { Routes } from '@/helpers/enums.ts';

export default function Header() {
  return (
    <header className={styles.header}>
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
