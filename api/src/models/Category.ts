import { IModel, Model, ModelInsertable } from "./Model.js";

export interface Category {
  name: string;
  link: string;
  slug: string;
}
export class CategoryInsertable extends ModelInsertable<CategoryInsertable> {
  name!: string;
  link!: string;
  slug!: string;
}
export interface ICategory extends Category, IModel {}
export class Category extends Model<ICategory> {
  name!: string;
  link!: string;
  slug!: string;
}

function create() {
  createTable(`CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name NOT NULL,
  link NOT NULL,
  slug NOT NULL
  )`);
}
