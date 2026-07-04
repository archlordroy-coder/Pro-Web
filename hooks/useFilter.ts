import { useState, useMemo, useCallback } from 'react';

export type FilterPredicate<T> = (item: T, query: string) => boolean;

export function useFilter<T>(
  items: T[],
  predicate: FilterPredicate<T>,
  initialQuery = '',
) {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(
    () => {
      if (!query.trim()) return items;
      return items.filter(item => predicate(item, query.toLowerCase()));
    },
    [items, query, predicate],
  );

  const clearFilter = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    filteredItems,
    isFiltered: query.trim().length > 0,
    clearFilter,
  };
}
