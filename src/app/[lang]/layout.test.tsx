import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './layout';

test('App Router: Works with dynamic route segments', () => {
  render(<Layout params={{ lang: 'en' }}>test page</Layout>);
  expect(screen.getByText('test page')).toBeDefined();
});
