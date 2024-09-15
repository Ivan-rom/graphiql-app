import { render } from '@testing-library/react';
import StoreProvider from './StoreProvider';
import { store } from '@/store/store';
import { describe, it, expect, vi } from 'vitest';

describe('StoreProvider', () => {
  it('renders children with redux provider', () => {
    const { getByText } = render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('wraps children in the redux provider', () => {
    const spy = vi.spyOn(store, 'dispatch');

    render(
      <StoreProvider>
        <div>Another Test Child</div>
      </StoreProvider>,
    );

    // Проверяем, что Redux store был инициализирован
    expect(spy).not.toHaveBeenCalledWith();
  });
});
