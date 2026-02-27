import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

const DEFAULT_PAGE_SIZE = 10;

export interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  startIndex: number;
  endIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  goToPage: (page: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

export function usePagination<T>(
  items: T[],
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const prevLengthRef = useRef(items.length);

  useEffect(() => {
    if (prevLengthRef.current !== items.length) {
      setCurrentPage(1);
      prevLengthRef.current = items.length;
    }
  }, [items.length]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const goToPage = useCallback(
    (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages))),
    [totalPages],
  );

  const goNext = useCallback(() => goToPage(safePage + 1), [safePage, goToPage]);
  const goPrev = useCallback(() => goToPage(safePage - 1), [safePage, goToPage]);

  const startIndex = items.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, items.length);

  return {
    currentPage: safePage,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    goToPage,
    goNext,
    goPrev,
  };
}
