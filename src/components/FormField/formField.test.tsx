import { describe, expect, it } from 'vitest';
import FormField from './FormField';
import { render } from '@testing-library/react';

describe('Form field', () => {
  it('should render properly', () => {
    const { getByText } = render(
      <FormField
        type="text"
        name="name"
        label="label"
        placeholder="placeholder"
        register={{
          name: 'name',
          onBlur: () => new Promise(() => true),
          onChange: () => new Promise(() => true),
          ref: () => {},
        }}
      />,
    );

    expect(getByText('label')).toBeInTheDocument();
  });

  it('should render error if provided', () => {
    const { getByText } = render(
      <FormField
        error="error"
        type="text"
        name="name"
        label="label"
        placeholder="placeholder"
        register={{
          name: 'name',
          onBlur: () => new Promise(() => true),
          onChange: () => new Promise(() => true),
          ref: () => {},
        }}
      />,
    );

    expect(getByText('error')).toBeInTheDocument();
  });
});
