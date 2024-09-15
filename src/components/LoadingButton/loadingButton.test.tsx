import { describe, expect, it } from 'vitest';
import LoadingButton from './LoadingButton';
import { render } from '@testing-library/react';

describe(' Loading button', () => {
  it('should render properly', () => {
    const { getByTestId } = render(<LoadingButton isLoading />);
    expect(getByTestId('loading-button')).toBeInTheDocument();
  });

  it('should render loader if isLoading === true', () => {
    const { getByTestId } = render(<LoadingButton isLoading={true} />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render children if isLoading === false', () => {
    const { getByText } = render(<LoadingButton isLoading={false}>test text</LoadingButton>);
    expect(getByText('test text')).toBeInTheDocument();
  });
});
