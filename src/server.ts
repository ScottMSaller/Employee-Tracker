import express from 'express';
import { connectToDb } from './connection.js';
import init from './logic.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT);
init();