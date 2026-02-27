import { renderHook, act } from '@testing-library/react-native';
import { usePagination } from '../../src/hooks/usePagination';

const makeItems = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

describe('usePagination', () => {

  describe('initial state', () => {
    it('starts on page 1', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.currentPage).toBe(1);
    });

    it('calculates totalPages correctly', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.totalPages).toBe(3);
    });

    it('returns the first page of items', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.paginatedItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('sets hasPrev to false on page 1', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.hasPrev).toBe(false);
    });

    it('sets hasNext to true when more pages exist', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.hasNext).toBe(true);
    });

    it('calculates startIndex as 1 on the first page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.startIndex).toBe(1);
    });

    it('calculates endIndex as pageSize on the first page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.endIndex).toBe(10);
    });
  });

  // ── Empty list ────────────────────────────────────────────────────────────────

  describe('empty items array', () => {
    it('returns totalPages of 1', () => {
      const { result } = renderHook(() => usePagination([], 10));
      expect(result.current.totalPages).toBe(1);
    });

    it('returns empty paginatedItems', () => {
      const { result } = renderHook(() => usePagination([], 10));
      expect(result.current.paginatedItems).toEqual([]);
    });

    it('sets startIndex to 0', () => {
      const { result } = renderHook(() => usePagination([], 10));
      expect(result.current.startIndex).toBe(0);
    });

    it('sets endIndex to 0', () => {
      const { result } = renderHook(() => usePagination([], 10));
      expect(result.current.endIndex).toBe(0);
    });

    it('sets hasPrev and hasNext to false', () => {
      const { result } = renderHook(() => usePagination([], 10));
      expect(result.current.hasPrev).toBe(false);
      expect(result.current.hasNext).toBe(false);
    });
  });


  describe('single page (items ≤ pageSize)', () => {
    it('returns totalPages of 1', () => {
      const { result } = renderHook(() => usePagination(makeItems(5), 10));
      expect(result.current.totalPages).toBe(1);
    });

    it('sets hasNext to false', () => {
      const { result } = renderHook(() => usePagination(makeItems(5), 10));
      expect(result.current.hasNext).toBe(false);
    });

    it('returns all items', () => {
      const { result } = renderHook(() => usePagination(makeItems(5), 10));
      expect(result.current.paginatedItems).toHaveLength(5);
    });
  });


  describe('goToPage', () => {
    it('navigates to the given page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(2); });
      expect(result.current.currentPage).toBe(2);
    });

    it('returns the correct items slice for page 2', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(2); });
      expect(result.current.paginatedItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    it('returns a partial last page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(3); });
      expect(result.current.paginatedItems).toEqual([21, 22, 23, 24, 25]);
    });

    it('clamps to page 1 when given 0', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(0); });
      expect(result.current.currentPage).toBe(1);
    });

    it('clamps to last page when given a value beyond totalPages', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(99); });
      expect(result.current.currentPage).toBe(3);
    });

    it('does not go below page 1 with a negative value', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(-5); });
      expect(result.current.currentPage).toBe(1);
    });
  });


  describe('goNext', () => {
    it('increments the page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goNext(); });
      expect(result.current.currentPage).toBe(2);
    });

    it('does not exceed the last page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(3); });
      act(() => { result.current.goNext(); });
      expect(result.current.currentPage).toBe(3);
    });
  });


  describe('goPrev', () => {
    it('decrements the page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(3); });
      act(() => { result.current.goPrev(); });
      expect(result.current.currentPage).toBe(2);
    });

    it('does not go below page 1', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goPrev(); });
      expect(result.current.currentPage).toBe(1);
    });
  });


  describe('hasPrev / hasNext flags', () => {
    it('hasPrev is false on page 1', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.hasPrev).toBe(false);
    });

    it('hasPrev is true on page 2', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(2); });
      expect(result.current.hasPrev).toBe(true);
    });

    it('hasNext is false on the last page', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(3); });
      expect(result.current.hasNext).toBe(false);
    });

    it('hasNext is true on all pages except the last', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.hasNext).toBe(true);
      act(() => { result.current.goToPage(2); });
      expect(result.current.hasNext).toBe(true);
    });
  });


  describe('startIndex and endIndex', () => {
    it('page 1: startIndex=1, endIndex=10', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      expect(result.current.startIndex).toBe(1);
      expect(result.current.endIndex).toBe(10);
    });

    it('page 2: startIndex=11, endIndex=20', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(2); });
      expect(result.current.startIndex).toBe(11);
      expect(result.current.endIndex).toBe(20);
    });

    it('last page: endIndex equals total items', () => {
      const { result } = renderHook(() => usePagination(makeItems(25), 10));
      act(() => { result.current.goToPage(3); });
      expect(result.current.startIndex).toBe(21);
      expect(result.current.endIndex).toBe(25);
    });
  });


  describe('auto-reset when items array length changes', () => {
    it('resets to page 1 when the items list shrinks', () => {
      const { result, rerender } = renderHook(
        ({ items }: { items: number[] }) => usePagination(items, 10),
        { initialProps: { items: makeItems(25) } },
      );

      act(() => { result.current.goToPage(3); });
      expect(result.current.currentPage).toBe(3);

      rerender({ items: makeItems(8) });

      expect(result.current.currentPage).toBe(1);
    });

    it('resets to page 1 when the items list grows', () => {
      const { result, rerender } = renderHook(
        ({ items }: { items: number[] }) => usePagination(items, 10),
        { initialProps: { items: makeItems(10) } },
      );

      act(() => { result.current.goToPage(1); });

      rerender({ items: makeItems(50) });

      expect(result.current.currentPage).toBe(1);
    });

    it('does NOT reset when items length stays the same', () => {
      const { result, rerender } = renderHook(
        ({ items }: { items: number[] }) => usePagination(items, 10),
        { initialProps: { items: makeItems(25) } },
      );

      act(() => { result.current.goToPage(2); });

      rerender({ items: makeItems(25) });

      expect(result.current.currentPage).toBe(2);
    });
  });


  describe('currentPage clamping', () => {
    it('clamps currentPage to totalPages when items shrink', () => {
      const { result, rerender } = renderHook(
        ({ items }: { items: number[] }) => usePagination(items, 10),
        { initialProps: { items: makeItems(30) } },
      );

      act(() => { result.current.goToPage(3); });
      expect(result.current.currentPage).toBe(3);

      rerender({ items: makeItems(15) });

      expect(result.current.currentPage).toBe(1);
    });
  });


  describe('custom page size', () => {
    it('uses the provided pageSize', () => {
      const { result } = renderHook(() => usePagination(makeItems(100), 20));
      expect(result.current.totalPages).toBe(5);
      expect(result.current.paginatedItems).toHaveLength(20);
    });

    it('calculates correct endIndex with pageSize of 20', () => {
      const { result } = renderHook(() => usePagination(makeItems(100), 20));
      expect(result.current.endIndex).toBe(20);
    });
  });
});
