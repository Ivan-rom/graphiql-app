import { describe, expect, it } from 'vitest';
import Loader from './Loader';
import { render } from '@testing-library/react';

describe('Loader', () => {
  it('should render properly', () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
