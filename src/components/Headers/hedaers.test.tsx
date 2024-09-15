import { describe, expect, it, vi } from 'vitest';
import Headers from './Headers';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

vi.mock('@/assets/svg/trash.svg', () => ({
  default: () => <svg data-testid="trash-icon" />,
}));

const state = {
  request: { headers: [{ id: 0, key: '', value: '' }], method: RequestMethods.GET, body: '', url: '' },
};

const messages = { Client: { headers: 'headers', 'key-placeholder': 'key', 'value-placeholder': 'value' } };

describe('Headers', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(<Headers />, { messages }, { preloadedState: state });

    expect(getByText('headers')).toBeInTheDocument();
  });
});
