import { renderWithIntl } from '@/__test__/utils';
import Page from './page';
import { describe, expect, it } from 'vitest';

describe('Not found page', () => {
  it('should renders properly', () => {
    const { getByText } = renderWithIntl(<Page />, {
      messages: { NotFound: { title: 'title', description: 'description', 'home-link': 'home' } },
    });

    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
    expect(getByText('home')).toBeInTheDocument();
  });
});
