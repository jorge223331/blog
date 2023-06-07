import express from "express";
import { Category } from "./models/Category.js";
import { QueryBuilder } from "./models/query-builder/index.js";
import { client } from "./db.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const columns = ["name", "link", "slug"];
const values = ["John", "asd", "john@example.com"];
const query = new QueryBuilder("INSERT", "categories")
  .insert(columns, values)
  .build();
console.log(client.query(query));
