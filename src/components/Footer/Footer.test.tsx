import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

vi.mock('@/assets/svg/github-logo.svg', () => ({
  default: () => <div>GitHubLogo</div>,
}));

vi.mock('@/assets/svg/rss-logo.svg', () => ({
  default: () => <div>RssLogo</div>,
}));

describe('Footer', () => {
  it('renders correctly with links and icons', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: 'GitHubLogo' });
    const rssLink = screen.getByRole('link', { name: 'RssLogo' });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/Ivan-rom/graphiql-app');
    expect(rssLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    expect(screen.getByText(/2024 All rights reserved/i)).toBeInTheDocument();
  });
});
