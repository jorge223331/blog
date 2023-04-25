import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";
export interface ITagInsertable {
  name: string;
  slug: string;
}
export class TagInsertable extends ModelInsertable<ITagInsertable> {
  name!: string;
  slug!: string;
}
export interface ITag extends ITagInsertable, IModel {}
export class Tag extends Model<ITag> {
  name!: string;
  slug!: string;
}
export async function createTag(c: TagInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO tags (name, slug, created) VALUES ($1, $2, $3)",
    values: [c.name, c.slug, created],
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
export async function updateTag(u: TagInsertable, id: number) {
  const updated = new Date();
  const query = {
    text: "UPDATE tags SET name = $1, slug = $2, updated = $3, WHERE id = $4)",
    values: [u.name, u.slug, updated, id],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Tag #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deletePost(id: number) {
  const deleted = new Date();
  const query = {
    text: "DELETE FROM posts WHERE id = $1",
    values: [id, deleted],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Post #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
