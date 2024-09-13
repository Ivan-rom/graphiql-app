import { NextIntlClientProvider } from 'next-intl';
import styles from './layout.module.css';
import { getMessages } from 'next-intl/server';
import StoreProvider from '../StoreProvider/StoreProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ReactNode } from 'react';

type Props = {
  params: {
    lang: string;
  };
  children: ReactNode;
};

export default async function Layout({ children, params }: Props) {
  const messages = await getMessages();

  return (
    <html lang={params.lang}>
      <body className={styles.body}>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
