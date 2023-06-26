import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";

export interface ICommentInsertable {
  post: number;
  author: number;
  content: string;
  rating: number;
  parent: number | null;
}

export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  post!: number;
  author!: number;
  content!: string;
  rating!: number;
  parent!: number | null;
  constructor(data: ICommentInsertable) {
    super(data);

    this.post = data.post;
    this.author = data.author;
    this.content = data.content;
    this.rating = data.rating;
    this.parent = data.parent;
  }
}

export async function createComment(c: CommentInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO comments (post, author, content, rating, parent, created) VALUES ($1, $2, $3, $4, $5, $6)",
    values: [c.post, c.author, c.content, c.rating, c.parent, created],
  };
  try {
    await client.query(query);
    console.log(
      `Comment (${c.post}, ${c.author}, ${c.content}, ${c.rating}, ${c.parent}) created`
    );
  } catch (error) {
    throw error;
  }
}

export async function deleteComment(id: number) {
  const query = {
    text: "DELETE FROM comments WHERE id = $1",
    values: [id],
  };
  try {
    await client.query(query);
    console.log(`Comment #${id} deleted`);
  } catch (error) {
    throw error;
  }
}

export interface IComment extends ICommentInsertable, IModel {}

export class Comment extends Model<IComment> {
  post!: number;
  author!: number;
  content!: string;
  rating!: number;
  parent!: number | null;
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post INTEGER NOT NULL,
  author INTEGER NOT NULL,
  content TEXT NOT NULL,
  rating SMALLINT NOT NULL,
  parent BIGINT,
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
