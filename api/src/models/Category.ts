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

function create() {
  client.createTable(`CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name NOT NULL,
  link NOT NULL,
  slug NOT NULL
  )`);
}
create();
