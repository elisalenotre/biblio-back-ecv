import express from "express";
import { getAllBooks, addBook, borrowBook, returnBook, deleteBook } from "../services/bookService";
import { authMiddleware } from "../middlewares/authMidleware";
import { checkRole } from "../middlewares/checkRole";


const router = express.Router();

router.get("/", (req, res) => {
  res.json(getAllBooks());
});

router.post("/", authMiddleware, checkRole("bibliothecaire"), (req, res) => {
  const { id, title, author } = req.body;
  addBook({ id, title, author, available: true });
  res.status(201).send("Book added.");
});

router.post("/:id/borrow", authMiddleware, checkRole("emprunteur"), (req, res) => {
  const { id } = req.params;
  const borrower = req.user?.id?.toString();
  if (borrower && borrowBook(id, borrower)) {
    res.send("Book borrowed.");
  } else {
    res.status(400).send("Book not available.");
  }
});

router.post("/:id/return", authMiddleware, checkRole("emprunteur"), (req, res) => {
  const { id } = req.params;
  if (returnBook(id)) {
    res.send("Book returned.");
  } else {
    res.status(400).send("Book not found or already available.");
  }
});

router.delete("/:id", authMiddleware, checkRole("bibliothecaire"), (req, res) => {
  const { id } = req.params;
  deleteBook(id);
  res.send("Book deleted.");
});

export default router;
