import { describe, expect, it, vi } from 'vitest';
import GraphqlBody from './GraphqlBody';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

vi.mock('@/assets/svg/schema.svg', () => ({
  default: () => <svg data-testid="schema-icon" />,
}));

const state = {
  request: {
    method: RequestMethods.GRAPHQL,
    url: '',
    body: '{"query": "query value", "variables": ""}',
    headers: [],
  },
};

describe('Graphql body', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(<GraphqlBody />, { messages: {} }, { preloadedState: state });

    expect(getByText('query')).toBeInTheDocument();
  });
});
