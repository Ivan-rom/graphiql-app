import { describe, expect, it } from 'vitest';
import { MethodSelector } from './MethodSelector';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

const state = {
  method: RequestMethods.GET,
  url: '',
  body: '',
  headers: [],
};

describe('Method selector', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(<MethodSelector />, { messages: {} }, { preloadedState: { request: state } });

    expect(getByText(RequestMethods.GET)).toBeInTheDocument();
  });
});
