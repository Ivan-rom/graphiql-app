"use client";

import styles from './LanguageToggler.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from '@/helpers/navigation.ts';
import { selectCurrentLocale } from '@/store/features/selectors.ts';
import { locales } from '@/helpers/constants.ts';
import { setLocale } from '@/store/features/languageSlice.ts';
import { usePathname } from '@/helpers/navigation.ts';

function LanguageToggler() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentLanguage = useSelector(selectCurrentLocale);
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === locales[0] ? locales[1] : locales[0];
    dispatch(setLocale(newLanguage));
    router.push(pathname,  { locale: newLanguage });
  };

  return (
    <div className={styles.languageToggler}>
      <label className={styles.switch}>
        <input
          className={styles.input}
          type="checkbox"
          checked={currentLanguage === locales[0]}
          onChange={toggleLanguage}
        />
        <span
          className={`
          ${styles.slider} 
          ${styles.round}
          `}
        ></span>
      </label>
    </div>
  );
};

export default LanguageToggler;
