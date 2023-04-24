import { Client } from "pg";


export const client = new Client({
  host: "localhost",
  port: 5432,
  database: "blog",
  user: "blog",
  password: "12345",
});
await client.connect();
