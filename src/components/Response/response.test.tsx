import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/__test__/utils';
import Response from './Response';

describe('Response', () => {
  const mockValue = { status: 200, body: 'body' };
  const messages = {
    Client: {
      response: { title: 'Response', status: 'Status:' },
    },
  };

  it('renders the loader when isLoading is true', () => {
    const { getByTestId } = renderWithIntl(<Response value={mockValue} isLoading={true} />, { messages });

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('renders the response details when isLoading is false', () => {
    const { getByText } = renderWithIntl(<Response value={mockValue} isLoading={false} />, { messages });

    expect(getByText('Response')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('body')).toBeInTheDocument();
  });
});
