import Link from 'next/link';
import styles from './WelcomeScreen.module.css';

type WelcomeScreenProps = {
  title: string;
  description: string;
  isAuthenticated: boolean;
  userName?: string | null;
  links?: { href: string; title: string }[];
};

export default function WelcomeScreen({
  title,
  description,
  isAuthenticated,
  userName,
  links = [],
}: WelcomeScreenProps) {
  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <>
          <h1 className={styles.title}>{`${title}, ${userName}`}</h1>
          <p>{description}</p>
        </>
      ) : (
        <>
          <h1 className={styles.title}>{title}</h1>
          <p>{description}</p>
          <div className={styles.links}>
            {links.map((link) => (
              <Link className={styles.link} key={link.href} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
