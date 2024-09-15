import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/assets/svg/RQ-logo.svg', () => ({
  default: () => <div>LogoMock</div>,
}));

vi.mock('@/components/HeaderLinks/HeaderLinks.tsx', () => ({
  default: () => <div>HeaderLinksMock</div>,
}));

vi.mock('@/components/LanguageToggler/LanguageToggler.tsx', () => ({
  default: () => <div>LanguageTogglerMock</div>,
}));

const renderWithIntl = (component: JSX.Element) => {
  const messages = {
    HomePage: {
      logOut: 'logOut',
      authLinks: {
        signIn: 'signIn',
        signUp: 'signUp',
      },
    },
  };

  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>,
  );
};

describe('Header component', () => {
  it('renders correctly with logo, links, and language toggler', () => {
    renderWithIntl(<Header />);

    expect(screen.getByText('LogoMock')).toBeInTheDocument();

    expect(screen.getByText('HeaderLinksMock')).toBeInTheDocument();

    expect(screen.getByText('LanguageTogglerMock')).toBeInTheDocument();
  });

  it('adds "fixed" class when scrolling down', () => {
    renderWithIntl(<Header />);

    const headerElement = screen.getByRole('banner');

    expect(headerElement).not.toHaveClass(/fixed/i);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(headerElement).toHaveClass(/fixed/i);
  });

  it('removes "fixed" class when scrolling back to top', () => {
    renderWithIntl(<Header />);

    const headerElement = screen.getByRole('banner');

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(headerElement).toHaveClass(/fixed/i);

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(headerElement).not.toHaveClass(/fixed/i);
  });
});
