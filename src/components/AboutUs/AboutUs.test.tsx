import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/__test__/utils';
import MyComponent from './AboutUs';

describe('MyComponent', () => {
  it('renders correctly with localized messages', () => {
    const messages = {
      HomePage: {
        aboutUs: {
          title: 'title',
          text: 'text',
          subtitle: 'subtitle',
          members: [
            { name: 'Element 1', role: 'Role 1', github: ' ' },
            { name: 'Element 2', role: 'Role 2', github: ' ' },
            { name: 'Element 3', role: 'Role 3', github: ' ' },
            { name: 'Element 4', role: 'Role 4', github: ' ' },
          ],
        },
      },
    };

    const { getByText } = renderWithIntl(<MyComponent />, { messages });

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('text')).toBeInTheDocument();
    expect(getByText('subtitle')).toBeInTheDocument();
    expect(getByText('Element 1')).toBeInTheDocument();
    expect(getByText('Element 2')).toBeInTheDocument();
    expect(getByText('Element 3')).toBeInTheDocument();
    expect(getByText('Element 4')).toBeInTheDocument();
  });
});
