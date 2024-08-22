import { NextIntlClientProvider } from 'next-intl';
import styles from './layout.module.css';
import { getMessages } from 'next-intl/server';

type Props = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};

export default async function Layout({ children, params }: Props) {
  const messages = await getMessages();

  return (
    <html lang={params.lang}>
      <body className={styles.body}>
        <NextIntlClientProvider messages={messages}>
          <main className={styles.main}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
