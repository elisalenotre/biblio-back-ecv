import { Book } from "../models/book";

let books: Book[] = [];

export const getAllBooks = () => books.filter(book => book.available);

export const addBook = (book: Book) => {
  books.push({ ...book, available: true });
};

export const borrowBook = (bookId: string, borrower: string) => {
  const book = books.find(b => b.id === bookId && b.available);
  if (book) {
    book.available = false;
    book.borrower = borrower;
    return true;
  }
  return false;
};

export const returnBook = (bookId: string) => {
  const book = books.find(b => b.id === bookId && !b.available);
  if (book) {
    book.available = true;
    book.borrower = undefined;
    return true;
  }
  return false;
};

export const deleteBook = (id: string): boolean => {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  };
