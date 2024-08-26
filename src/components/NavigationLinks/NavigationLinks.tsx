import styles from './NavigationLinks.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/helpers/navigation';
import { Routes } from '@/helpers/enums';

interface NavigationLinksProps extends Record<string, unknown> {
  isAuthLinks?: boolean;
}

export default function NavigationLinks({ isAuthLinks }: NavigationLinksProps) {
  const t = useTranslations('HomePage');

  const mainLinks = [
    { href: Routes.restApi, label: 'mainLinks.restApi' },
    { href: Routes.graphiQL, label: 'mainLinks.graphiQL' },
    { href: Routes.history, label: 'mainLinks.history' },
  ];

  const authLinks = [
    { href: Routes.signUp, label: t('authLinks.signUp') },
    { href: Routes.signIn, label: t('authLinks.signIn') },
  ];

  const links = isAuthLinks ? mainLinks : authLinks;

  return (
    <div className={styles.links}>
      {links.map(({ href, label }, index) => (
        <Link
          className={styles.link}
          key={index}
          href={href}
          prefetch={isAuthLinks ? false : undefined}
        >
          {t(label)}
        </Link>
      ))}
    </div>
  );
}
