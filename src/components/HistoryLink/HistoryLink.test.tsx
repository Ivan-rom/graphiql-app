import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import HistoryLink from './HistoryLink';
import { RequestMethods } from '@/helpers/enums';
import { renderWithIntl } from '@/__test__/utils';
import userEvent from '@testing-library/user-event';

describe('test history link', () => {
  it('should display history link', () => {
    const request = { method: RequestMethods.GET, url: 'testURL', href: 'testHREF' };
    renderWithIntl(<HistoryLink request={request} />, { messages: {} });
    expect(screen.getByText(RequestMethods.GET)).toBeInTheDocument();
    expect(screen.getByText('testURL')).toBeInTheDocument();
  });

  it('should display history link', async () => {
    const request = { method: RequestMethods.GET, url: 'testURL', href: '/testHREF' };
    const expectedHREF = `/en/client${request.href}`;
    renderWithIntl(<HistoryLink request={request} />, { messages: {} });
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expectedHREF);
    await userEvent.click(link);
  });
});
