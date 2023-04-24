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
export async function createCategory(c: CategoryInsertable) {
  const created = new Date();
  const querry = {
    text: "INSERT INTO categories (name, link, slug, created) VALUES ($1, $2, $3, $4)",
    values: [c.name, c.link, c.slug, created],
  };
  client
    .query(querry)
    .then(() => {
      console.log(`Category ${c.name} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function updateCategory(c: CategoryInsertable, id: number) {
  const updated = new Date();
  const querry = {
    text: "UPDATE categories SET name = $2, link = $3 slug = $4, updated = $5, WHERE id = $6)",
    values: [c.name, c.link, c.slug, updated, id],
  };
  client
    .query(querry)
    .then(() => {
      console.log(`Category #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deleteCategory(d: CategoryInsertable, id: number) {
  const deleted = new Date();
  const querry = {
    text: "DELETE FROM categories WHERE id = $1",
    values: [id],
  };
  client
    .query(querry)
    .then(() => {
      console.log(`Category #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
