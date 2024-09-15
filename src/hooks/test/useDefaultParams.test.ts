import { RequestMethods } from '@/helpers/enums';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDefaultParams } from '../useDefaultParams';
import { DEFAULT_VARIABLE } from '@/helpers/constants';

vi.mock('next/navigation', () => ({
  useParams: () => ({ request: [RequestMethods.GET, 'dGVzdC51cmw=', 'dGVzdCBib2R5'] }),
  useSearchParams: () =>
    new URLSearchParams([
      ['Content-Type', 'application/json'],
      ['', ''],
    ]),
}));

describe('test useDefaultParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should define default params', () => {
    const { result } = renderHook(() => useDefaultParams());
    expect(result.current.method).toBe(RequestMethods.GET);
    expect(result.current.url).toBe('test.url');
    expect(result.current.body).toBe('test body');
    expect(result.current.headers).toEqual([
      { key: 'Content-Type', value: 'application/json', id: 1 },
      { ...DEFAULT_VARIABLE, id: 2 },
    ]);
  });
});
