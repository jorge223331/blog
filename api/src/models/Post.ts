import { client } from "../db.js";
import { IModel, Model, ModelInsertable } from "./Model.js";

export interface IPostInsertable {
  title: string;
  description: string;
  link: string;
  slug: string;
  content: string;
  tags: number[] | [];
  category: number;
  status: "draft" | "published";
  author: string;
  comments: number[] | [];
}

export class PostInsertable extends ModelInsertable<IPostInsertable> {
  title!: string;
  description!: string;
  link!: string;
  slug!: string;
  content!: string;
  tags!: number[] | [];
  category!: number;
  status!: "draft" | "published";
  author!: string;
  comments!: number[] | [];
}
export async function createPost(p: PostInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO posts (title, description, link, slug, content, tags, category, status, author, comments, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    values: [
      p.title,
      p.description,
      p.link,
      p.slug,
      p.content,
      p.tags,
      p.category,
      p.status,
      p.author,
      p.comments,
      created,
    ],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Post ${p.slug} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function updatePost(id: number, options: PostInsertable) {
  const updated = new Date();
  for (const key of Object.keys(options) as Array<keyof PostInsertable>) {
    const query = {
      text: `Update posts SET ${key} = $1 WHERE id =$2`,
      values: [options[key], id],
    };
    client
      .query(query)
      .then(() => {
        console.log(`Post #${id} field ${key} updated`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  const query = {
    text: `UPDATE posts SET updated = $1 WHERE id = $2`,
    values: [updated, id],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Post #${id} field updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deletePost(d: PostInsertable, id: number) {
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

export interface IPost extends IPostInsertable, IModel {}

export class Post extends Model<IPost> {
  title!: string;
  description!: string;
  link!: string;
  slug!: string;
  content!: string;
  tags!: number[] | [];
  category!: number;
  status!: "draft" | "published";
  author!: string;
  comments!: number[] | [];
}
const createTableQuery = `CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        content TEXT NOT NULL,
        tags INTEGER[] NOT NULL,
        category INTEGER NOT NULL,
        status TEXT NOT NULL,
        author TEXT NOT NULL,
        comments INTEGER[] NOT NULL,
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
