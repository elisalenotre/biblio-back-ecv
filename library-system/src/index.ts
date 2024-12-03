import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bookRoutes from "./routes/books";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
