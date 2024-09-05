import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('routes'));

pool.query(`SELECT * FROM employee_tb`, (err: Error, result: QueryResult) => {
  if (err) {
    console.log(`Uh Oh! there was an error while processing your request: ${err}`);
  } else {
    console.log(result.rows);
  }
});


// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
