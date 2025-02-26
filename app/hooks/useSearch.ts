import { useState, useCallback, useMemo } from 'react';

interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
}

export function useSearch<T>({ data, searchFields }: UseSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery);
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchQuery);
        }
        return false;
      })
    );
  }, [data, searchFields, searchQuery]);

  return {
    searchQuery,
    handleSearch,
    filteredData,
  };
} 