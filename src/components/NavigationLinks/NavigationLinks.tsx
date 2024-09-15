import styles from './NavigationLinks.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/helpers/navigation';
import { authLinks, mainLinks } from '@/helpers/constants.ts';

interface NavigationLinksProps extends Record<string, unknown> {
  isAuthLinks?: boolean;
}

export default function NavigationLinks({ isAuthLinks }: NavigationLinksProps) {
  const t = useTranslations('HomePage');

  const links = isAuthLinks ? mainLinks : authLinks;

  return (
    <div className={styles.links}>
      {links.map(({ href, label }, index) => (
        <Link className={styles.link} key={index} href={href} prefetch={isAuthLinks ? false : undefined}>
          {t(label)}
        </Link>
      ))}
    </div>
  );
}
