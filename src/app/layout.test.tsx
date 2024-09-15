import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './layout';

test('Root layout: renders passed children', () => {
  render(<Layout>test page</Layout>);
  expect(screen.getByText('test page')).toBeDefined();
});
