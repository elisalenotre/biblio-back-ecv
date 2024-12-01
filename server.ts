import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});