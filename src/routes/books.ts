import express from 'express';
import { Book } from '../models/book';

const router = express.Router();

let books: Book[] = [];

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/add', (req, res) => {
  const newBook: Book = {
    id: new Date().toISOString(),
    title: req.body.title,
    author: req.body.author,
    available: true,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter((book) => book.id !== id);
  res.status(200).send('Book deleted');
});

router.post('/borrow/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book && book.available) {
    book.available = false;
    res.status(200).json(book);
  } else {
    res.status(400).send('Book not available');
  }
});

router.post('/return/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book && !book.available) {
    book.available = true;
    res.status(200).json(book);
  } else {
    res.status(400).send('Book not borrowed');
  }
});

export default router;
