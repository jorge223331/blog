import pkg from "pg";
const { Client } = pkg;

export const client = new Client({
  host: "localhost",
  port: 5432,
  database: "blogs",
  user: "blogs",
  password: "12345",
});
await client.connect();
