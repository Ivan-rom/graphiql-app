import styles from './layout.module.css';

type Props = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};

export default function Layout({ children, params }: Props) {
  return (
    <html lang={params.lang}>
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
