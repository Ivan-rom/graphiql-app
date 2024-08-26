import styles from './NavigationLinks.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/helpers/navigation';
import { Routes } from '@/helpers/enums';

export type RoutesKeys = keyof typeof Routes;

interface NavigationLinksProps extends Record<string, unknown> {
  links: { href: RoutesKeys; label: string }[];
  isAuthLinks?: boolean;
}

export default function NavigationLinks({
  links,
  isAuthLinks,
}: NavigationLinksProps) {
  const t = useTranslations();

  return (
    <div className={styles.links}>
      {links.map((link, index) => (
        <Link
          key={index}
          className={styles.link}
          href={!isAuthLinks ? Routes[link.href] : Routes[link.href]}
          prefetch={isAuthLinks ? false : undefined}
        >
          {t(link.label)}
        </Link>
      ))}
    </div>
  );
}
