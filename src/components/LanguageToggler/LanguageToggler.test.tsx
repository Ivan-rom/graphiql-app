import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LanguageToggler from './LanguageToggler';
import { IntlProvider } from 'next-intl';

vi.mock('next-intl', async (importOriginal) => {
  const original = (await importOriginal()) as typeof import('next-intl');
  return {
    ...original,
    useTranslations: () => (key: string) => key,
  };
});

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    locale: 'en',
  }),
  usePathname: () => '/home',
  useParams: () => ({
    lang: 'en',
  }),
}));

describe('LanguageToggler Component', () => {
  const messages = { en: { title: 'English' }, ru: { title: 'Russian' } };

  it('renders correctly', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <LanguageToggler />
      </IntlProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('toggles language correctly', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <LanguageToggler />
      </IntlProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/ru'));
  });
});
