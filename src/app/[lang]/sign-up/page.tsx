import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { pickMessages } from '@/helpers/pisckMessages';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

async function SignUpPage() {
  const messages = await getMessages();

  return (
    <main>
      <NextIntlClientProvider
        messages={pickMessages(messages, 'Form', 'SignUp')}
      >
        <SignUpForm />
      </NextIntlClientProvider>
    </main>
  );
}

export default SignUpPage;
