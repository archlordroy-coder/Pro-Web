import { useState, useMemo } from 'react';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export function usePagination<T>(
  items: T[],
  pageSize: number = 10,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationState = useMemo<PaginationState>(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const page = Math.min(Math.max(1, currentPage), totalPages || 1);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      startIndex,
      endIndex,
    };
  }, [items.length, pageSize, currentPage]);

  const paginatedItems = useMemo(
    () => items.slice(paginationState.startIndex, paginationState.endIndex),
    [items, paginationState.startIndex, paginationState.endIndex],
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (paginationState.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (paginationState.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(paginationState.totalPages);

  return {
    ...paginationState,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  };
}
