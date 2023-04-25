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
  const query = {
    text: "INSERT INTO categories (name, link, slug, created) VALUES ($1, $2, $3, $4)",
    values: [c.name, c.link, c.slug, created],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Category ${c.name} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function updateCategory(u: CategoryInsertable, id: number) {
  const updated = new Date();
  const query = {
    text: "UPDATE categories SET name = $1, link = $2 slug = $3, updated = $4, WHERE id = $5)",
    values: [u.name, u.link, u.slug, updated, id],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Category #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deleteCategory(id: number) {
  const deleted = new Date();
  const query = {
    text: "DELETE FROM categories WHERE id = $1",
    values: [id, deleted],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Category #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
