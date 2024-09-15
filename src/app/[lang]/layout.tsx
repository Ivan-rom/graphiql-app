import { NextIntlClientProvider } from 'next-intl';
import styles from './layout.module.css';
import { getMessages } from 'next-intl/server';
import StoreProvider from '../../components/StoreProvider/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';

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
            <ToastContainer theme="dark" />
            <Header />
            <main className={styles.main}>
              <AuthWrapper>{children}</AuthWrapper>
            </main>
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
