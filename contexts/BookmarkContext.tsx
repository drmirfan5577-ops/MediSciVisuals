import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Template } from '@/constants/data';

interface BookmarkContextType {
  bookmarks: Template[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (template: Template) => void;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Template[]>([]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some((b) => b.id === id);
  }, [bookmarks]);

  const toggleBookmark = useCallback((template: Template) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === template.id);
      if (exists) return prev.filter((b) => b.id !== template.id);
      return [template, ...prev];
    });
  }, []);

  const clearBookmarks = useCallback(() => setBookmarks([]), []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
  return ctx;
}
