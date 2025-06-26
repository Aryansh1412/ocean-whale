'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/app/types/user';

interface BookmarkContextProps {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (userId: number) => void;
}

const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<User[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (user: User) => {
    setBookmarks((prev) => [...prev, user]);
  };

  const removeBookmark = (userId: number) => {
    setBookmarks((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
