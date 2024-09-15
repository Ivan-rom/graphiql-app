import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MyComponent from './ClientDescription';
import { renderWithIntl } from '@/__test__/utils.tsx';

vi.mock('@/assets/svg/rest-api-icon.svg', () => ({
  default: () => <div>RestIcon</div>,
}));

vi.mock('@/assets/svg/graphql-icon.svg', () => ({
  default: () => <div>GraphqlIcon</div>,
}));

vi.mock('@/assets/svg/history-icon.svg', () => ({
  default: () => <div>HistoryIcon</div>,
}));

describe('MyComponent', () => {
  it('renders correctly with localized messages', () => {
    const messages = {
      HomePage: {
        clientDescription: {
          title: ['Rest API', 'GraphQL', 'History'],
          text: ['text1', 'text2', 'text3'],
        },
      },
    };

    renderWithIntl(<MyComponent />, { messages });

    expect(screen.getByText('Rest API')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('text1')).toBeInTheDocument();
    expect(screen.getByText('text2')).toBeInTheDocument();
    expect(screen.getByText('text3')).toBeInTheDocument();
  });

  it('renders correctly with icons', () => {
    const messages = {
      HomePage: {
        clientDescription: {
          title: ['Rest API', 'GraphQL', 'History'],
          text: ['text1', 'text2', 'text3'],
        },
      },
    };

    renderWithIntl(<MyComponent />, { messages });

    expect(screen.getByText('RestIcon')).toBeInTheDocument();
    expect(screen.getByText('GraphqlIcon')).toBeInTheDocument();
    expect(screen.getByText('HistoryIcon')).toBeInTheDocument();
  });
});
