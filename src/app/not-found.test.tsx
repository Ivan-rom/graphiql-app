import { describe, expect, it, vi } from 'vitest';
import NotFoundPage from './not-found';
import { locales } from '@/helpers/constants';
import { permanentRedirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  permanentRedirect: vi.fn(),
}));

describe('NotFoundPage', () => {
  it('should redirect to the default locale', () => {
    NotFoundPage();

    expect(permanentRedirect).toHaveBeenCalledWith(`/${locales[0]}`);
  });
});
