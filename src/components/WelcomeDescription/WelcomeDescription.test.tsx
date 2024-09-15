import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/__test__/utils';
import MyComponent from './WelcomeDescription';

describe('MyComponent', () => {
  it('renders correctly with localized messages', () => {
    const messages = {
      HomePage: {
        description: {
          text: 'text',
          list: ['Element 1', 'Element 2'],
        },
      },
    };

    const { getByText } = renderWithIntl(<MyComponent />, { messages });

    expect(getByText('text')).toBeInTheDocument();
    expect(getByText('Element 1')).toBeInTheDocument();
    expect(getByText('Element 2')).toBeInTheDocument();
  });
});
