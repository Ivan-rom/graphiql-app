import { ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';

type Message = {
  [key: string]: string | Message | Message[] | string[];
};

type ProviderProps = {
  messages: Message;
  locale?: string;
};

export function renderWithIntl(ui: ReactNode, { locale = 'en', messages }: ProviderProps) {
  return render(
    <NextIntlClientProvider messages={messages as AbstractIntlMessages} locale={locale}>
      {ui}
    </NextIntlClientProvider>,
  );
}
