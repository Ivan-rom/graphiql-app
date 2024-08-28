import { NextIntlClientProvider } from 'next-intl';
import styles from './layout.module.css';
import { getMessages } from 'next-intl/server';
import StoreProvider from '../StoreProvider/StoreProvider';
import Header from '@/components/Header/Header.tsx';

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
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className={styles.main}>{children}</main>
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
