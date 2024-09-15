import { describe, expect, it } from 'vitest';
import { useStatusCodeClassName } from '../useStatusCodeClassName';
import { renderHook } from '@testing-library/react';

describe('test useStatusCodeClassName', () => {
  it('should return serverError', () => {
    const { result } = renderHook(() => useStatusCodeClassName(500));
    expect(result.current).toBe('serverError');
  });

  it('should return clientError', () => {
    const { result } = renderHook(() => useStatusCodeClassName(400));
    expect(result.current).toBe('clientError');
  });

  it('should return redirect', () => {
    const { result } = renderHook(() => useStatusCodeClassName(300));
    expect(result.current).toBe('redirect');
  });

  it('should return success', () => {
    const { result } = renderHook(() => useStatusCodeClassName(200));
    expect(result.current).toBe('success');
  });

  it('should return success', () => {
    const { result } = renderHook(() => useStatusCodeClassName(100));
    expect(result.current).toBe('info');
  });
});
