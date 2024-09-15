import { describe, it, expect, vi } from 'vitest';
import SdlEndpoint from './SdlUrl';
import { renderWithIntl } from '@/__test__/utils';
import { RequestMethods } from '@/helpers/enums';

vi.mock('@/assets/svg/schema.svg', () => ({
  default: () => <svg data-testid="schema-icon" />,
}));

const state = {
  request: {
    url: '',
    method: RequestMethods.GET,
    body: '',
    headers: [],
  },
};

const messages = { Client: { 'sdl-placeholder': 'sdl', 'sdl-button': 'button' }, SdlErrors: {} };

describe('Sdl endpoint', () => {
  it('should render properly', () => {
    const { getByText } = renderWithIntl(
      <SdlEndpoint schema={null} updateSchema={() => {}} isSchemaVisible={false} setIsSchemaVisible={() => {}} />,
      { messages },
      { preloadedState: state },
    );

    expect(getByText('button')).toBeInTheDocument();
  });
});
