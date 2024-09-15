import { describe, expect, it } from 'vitest';
import JSONEditor from './JSONEditor';
import { renderWithIntl } from '@/__test__/utils';

describe('JSONEditor', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(<JSONEditor title="title" variables="" setVariables={() => {}} />, {
      messages: { Client: { 'variables-type': 'variables' } },
    });

    expect(getByText('title')).toBeInTheDocument();
  });
});
