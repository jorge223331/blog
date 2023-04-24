import { client } from "../db.js";
import { IModel, Model, ModelInsertable } from "./Model.js";

export interface IPostInsertable {
  title: string;
  description: string;
  link: string;
  slug: string;
  content: string;
  tags: string | string[];
  category: string;
  status: "draft" | "published";
  author: string;
  comments: string[] | string;
}

export class PostInsertable extends ModelInsertable<IPostInsertable> {
  title!: string;
  description!: string;
  link!: string;
  slug!: string;
  content!: string;
  tags!: string | string[];
  category!: string;
  status!: "draft" | "published";
  author!: string;
  comments!: string[] | string;
}
export function createPost(p: PostInsertable) {
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
export interface updatePostOptions {
  title?: string;
  description?: string;
  author?: string;
  slug?: string;
  status?: "published" | "draft";
  link?: string;
  content?: string;
}
export function updatePost(id: number, options: updatePostOptions) {
  const updated = new Date();
  for (const key of Object.keys(options) as Array<keyof updatePostOptions>) {
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
export interface IPost extends IPostInsertable, IModel {}

export class Post extends Model<IPost> {
  title!: string;
  description!: string;
  link!: string;
  slug!: string;
  content!: string;
  tags!: string | string[];
  category!: string;
  status!: "draft" | "published";
  author!: string;
  comments!: string[] | string;
}
