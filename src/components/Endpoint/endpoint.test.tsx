import { describe, it, expect } from 'vitest';
import Endpoint from './Endpoint';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

const state = {
  request: {
    url: '',
    method: RequestMethods.GET,
    body: '',
    headers: [],
  },
};

const messages = { Client: { 'url-placeholder': 'url', send: 'send' } };

describe('Endpoint', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(<Endpoint sendHandler={() => {}} />, { messages }, { preloadedState: state });

    expect(getByText('send')).toBeInTheDocument();
  });
});
