import styles from './Footer.module.css';
import Link from 'next/link';
import GitHubLogo from '../../assets/svg/github-logo.svg';
import RssLogo from '../../assets/svg/rss-logo.svg';

function Footer() {
  const links = [
    {
      href: 'https://github.com/Ivan-rom/graphiql-app',
      src: GitHubLogo,
      alt: 'github-icon',
    },
    {
      href: 'https://rs.school/courses/reactjs',
      src: RssLogo,
      alt: 'react-icon',
    },
  ];

  return (
    <footer className={styles.footer}>
      {links.map((link, index) => (
        <Link
          className={styles.link}
          key={index}
          href={link.href}
          target="_blank"
        >
          <link.src className={styles.image} alt={link.alt} />
        </Link>
      ))}
      <p className={styles.text}>&copy; 2024 All rights reserved.</p>
    </footer>
  );
}

export default Footer;
