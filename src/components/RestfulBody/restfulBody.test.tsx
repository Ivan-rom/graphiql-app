import { describe, expect, it } from 'vitest';
import RestfulBody from './RestfulBody';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

const state = {
  request: {
    body: 'body test text',
    url: '',
    method: RequestMethods.GET,
    headers: [],
  },
};

describe('Restful body', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(
      <RestfulBody />,
      { messages: { Client: { 'body-title': 'title', 'variables-type': 'variables' } } },
      { preloadedState: state },
    );

    expect(getByText('body test text')).toBeInTheDocument();
  });
});
