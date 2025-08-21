const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

const port = 3000;

dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.json({message: "Hello World!"});
});

app.use('/alunos', require('./routes/alunosRoute'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
