import SignInForm from '@/components/SignInForm/SignInForm';
import { pickMessages } from '@/helpers/pisckMessages';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import styles from './page.module.css';

async function SignInPage() {
  const messages = await getMessages();

  return (
    <section className={styles.page}>
      <NextIntlClientProvider
        messages={pickMessages(messages, 'Form', 'SignIn')}
      >
        <SignInForm />
      </NextIntlClientProvider>
    </section>
  );
}

export default SignInPage;
