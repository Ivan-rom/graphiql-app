import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { pickMessages } from '@/helpers/pisckMessages';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import styles from './page.module.css';

async function SignUpPage() {
  const messages = await getMessages();

  return (
    <section className={styles.section}>
      <NextIntlClientProvider
        messages={pickMessages(messages, 'Form', 'SignUp')}
      >
        <SignUpForm />
      </NextIntlClientProvider>
    </section>
  );
}

export default SignUpPage;
