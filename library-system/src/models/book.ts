export interface Book {
    id: string;
    title: string;
    author: string;
    available: boolean;
    borrower?: string;
  }
  