import { useState, useEffect } from 'react';

const RECENT_SEARCH_KEY = 'ev_recent_searches';

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(RECENT_SEARCH_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse recent searches', e);
    }
  }, []);

  const addRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setRecentSearches((prev) => {
      const newRecent = [searchTerm, ...prev.filter((item) => item !== searchTerm)].slice(0, 5);
      sessionStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const removeRecentSearch = (searchTerm: string) => {
    setRecentSearches((prev) => {
      const newRecent = prev.filter((item) => item !== searchTerm);
      sessionStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    sessionStorage.removeItem(RECENT_SEARCH_KEY);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
}
