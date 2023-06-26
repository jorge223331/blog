import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";
export interface ITagInsertable {
  name: string;
  link: string;
  slug: string;
}
export class TagInsertable extends ModelInsertable<ITagInsertable> {
  name!: string;
  link!: string;
  slug!: string;
  constructor(data: ITagInsertable) {
    super(data);
    this.name = data.name;
    this.link = data.link;
    this.slug = data.slug;
  }
}
export interface ITag extends ITagInsertable, IModel {}
export class Tag extends Model<ITag> {
  name!: string;
  link!: string;
  slug!: string;
}
export async function createTag(c: TagInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO tags (name, link, slug, created) VALUES ($1, $2, $3, $4)",
    values: [c.name, c.link, c.slug, created],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Tag ${c.name} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function updateTag(u: TagInsertable, id: number) {
  const updated = new Date();
  const query = {
    text: "UPDATE tags SET name = $1, link = $2, slug = $3, updated = $4 WHERE id = $5",
    values: [u.name, u.link, u.slug, updated, id],
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
export async function deleteTag(id: number) {
  const query = {
    text: "DELETE FROM tags WHERE id = $1",
    values: [id],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Tag #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
const createTableQuery = `CREATE TABLE IF NOT EXISTS tags( 
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP)`;
client.query(createTableQuery, (error, result) => {
  if (error) {
    console.error("Error creating table", error);
  } else {
    console.log("Table created successfully");
  }
  // client.end();
});
