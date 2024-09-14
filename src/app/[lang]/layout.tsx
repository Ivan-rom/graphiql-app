import { NextIntlClientProvider } from 'next-intl';
import styles from './layout.module.css';
import { getMessages } from 'next-intl/server';
import StoreProvider from '../../components/StoreProvider/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer theme="dark" />
            <main className={styles.main}>{children}</main>
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
