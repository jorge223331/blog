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

export async function createPost(data: IPostInsertable) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`);

  const query = `INSERT INTO posts (${columns.join(
    ","
  )}) VALUES (${placeholders.join(",")}) RETURNING *`;

  try {
    const result = await client.query(query, values);
    const createdPost = result.rows[0];
    console.log(`Post ${createdPost.slug} created`);
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function updatePost(id: number, data: Partial<IPostInsertable>) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map((col, i) => `${col} = $${i + 1}`);

  const query = {
    text: `UPDATE posts SET ${placeholders.join(",")} WHERE id = $${
      values.length + 1
    }`,
    values: [...values, id],
  };

  try {
    await client.query(query);
    console.log(`Post #${id} updated`);
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function deletePost(id: number) {
  const query = {
    text: "DELETE FROM posts WHERE id = $1",
    values: [id],
  };

  try {
    await client.query(query);
    console.log(`Post #${id} deleted`);
  } catch (err) {
    throw new Error(String(err));
  }
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
});
