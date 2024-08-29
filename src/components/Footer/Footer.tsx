import styles from './Footer.module.css';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link
        className={styles.link}
        href={'https://github.com/Ivan-rom/graphiql-app'}
        target={'_blank'}
      >
        <img
          className={styles.image}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/128px-Github-desktop-logo-symbol.svg.png?20200316183539"
          alt="GitHub"
        />
      </Link>
      <p className={styles.text}>&copy; 2024 All rights reserved.</p>
      <Link
        className={styles.link}
        href={'https://rs.school/courses/reactjs'}
        target={'_blank'}
      >
        <img
          className={styles.image}
          src="https://dwglogo.com/wp-content/uploads/2017/09/React_logo_vector.svg"
          alt="RS School React Course"
        />
      </Link>
    </footer>
  );
}

export default Footer;
