'use client';

import styles from './LanguageToggler.module.css';
import { usePathname } from '@/helpers/navigation';
import { locales } from '@/helpers/constants';
import { useRouter, useParams } from 'next/navigation';

function LanguageToggler() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.lang;

  const toggleLanguage = () => {
    const newLocale = locale === locales[0] ? locales[1] : locales[0];
    const newPathname = pathname ? pathname.replace(`/${locale}`, '') : '';

    router.push(`/${newLocale}${newPathname}`);
  };

  return (
    <div className={styles.languageToggler}>
      <label className={styles.switch}>
        <input className={styles.input} type="checkbox" checked={locale === locales[0]} onChange={toggleLanguage} />
        <span
          className={`
          ${styles.slider} 
          ${styles.round}
          `}
        ></span>
      </label>
    </div>
  );
}

export default LanguageToggler;
