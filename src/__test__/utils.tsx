import { PropsWithChildren, ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { render, RenderOptions } from '@testing-library/react';
import { AppStore, RootState, setupStore } from './mock/store/store';
import { Provider } from 'react-redux';

type Message = {
  [key: string]: string | Message | Message[] | string[];
};

type ProviderProps = {
  messages: Message;
  locale?: string;
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithIntl(
  ui: ReactNode,
  { locale = 'en', messages }: ProviderProps,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        <NextIntlClientProvider messages={messages as AbstractIntlMessages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
