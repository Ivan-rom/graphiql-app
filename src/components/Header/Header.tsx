import styles from './Header.module.css';
import HeaderButtons from '@/components/HeaderButtons/HeaderButtons';
import { Link } from '@/helpers/navigation.ts';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Unit
      </Link>
      <div className={styles.langugaeToggler} />
      <HeaderButtons />
    </header>
  );
}
