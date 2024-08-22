import SignInForm from '@/components/SignInForm/SignInForm';
import { pickMessages } from '@/helpers/pisckMessages';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

async function SignInPage() {
  const messages = await getMessages();

  return (
    <main>
      <NextIntlClientProvider
        messages={pickMessages(messages, 'Form', 'SignIn')}
      >
        <SignInForm />
      </NextIntlClientProvider>
    </main>
  );
}

export default SignInPage;
