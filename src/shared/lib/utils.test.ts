import { describe, expect, it } from 'vitest';

import { cn, formatCurrency, formatNumber, getInitials, truncate } from '@/shared/lib/utils';

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'conditional', 'end')).toBe('base end');
  });
});

describe('formatCurrency()', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });
});

describe('formatNumber()', () => {
  it('formats numbers with thousand separator', () => {
    expect(formatNumber(12483)).toBe('12,483');
  });
});

describe('getInitials()', () => {
  it('returns initials from a full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('handles single name', () => {
    expect(getInitials('Alice')).toBe('A');
  });
});

describe('truncate()', () => {
  it('truncates long strings', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });

  it('leaves short strings unchanged', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });
});
