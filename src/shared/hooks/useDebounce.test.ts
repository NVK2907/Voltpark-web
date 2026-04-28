import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDebounce } from '@/shared/hooks';

describe('useDebounce()', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'first' },
    });

    expect(result.current).toBe('first');

    rerender({ value: 'second' });

    // Still first immediately after rerender
    expect(result.current).toBe('first');

    // Wait for debounce
    await act(async () => {
      await new Promise((r) => setTimeout(r, 150));
    });

    expect(result.current).toBe('second');
  });
});
