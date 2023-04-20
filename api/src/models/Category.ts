import { client } from "../db.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
export interface ICategoryInsertable {
  name: string;
  link: string;
  slug: string;
}
export class CategoryInsertable extends ModelInsertable<ICategoryInsertable> {
  name!: string;
  link!: string;
  slug!: string;
}
export interface ICategory extends ICategoryInsertable, IModel {}
export class Category extends Model<ICategory> {
  name!: string;
  link!: string;
  slug!: string;
}
interface Table {
  query: string;
}
const tables: Table[] = [
  {
    query: `CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name NOT NULL,
  link NOT NULL,
  slug NOT NULL
  )`,
  },
];
async function createTable(table: Table) {
  try {
    await client.query(table.query);
    console.log("Table created");
  } catch (err) {
    console.log("error", err);
  }
}
export function callTable() {
  tables.map((t) => createTable(t));
}
