import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";
export interface ICommentInsertable {
  post: number;
  content: string;
  author: number;
  rating: string;
  parent: boolean;
}
export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  post!: number;
  content!: string;
  author!: number;
  rating!: string;
  parent!: boolean;
}
export async function createComment(c: CommentInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO comments (post, content, author,  rating, parent, created) VALUES ($1, $2, $3, $4, $5, $6)",
    values: [c.post, c.content, c.author, c.rating, c.parent, created],
  };
  client
    .query(query)
    .then(() => {
      console.log(
        `Comment ${(c.post, c.content, c.author, c.rating, c.parent)} created`
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deleteComment(id: number) {
  const deleted = new Date();
  const query = {
    text: "DELETE FROM comments WHERE id = $1",
    values: [id, deleted],
  };
  client
    .query(query)
    .then(() => {
      console.log(`Comment #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export interface IComment extends ICommentInsertable, IModel {}

export class Comment extends Model<IComment> {
  post!: number;
  content!: string;
  author!: number;
  rating!: string;
  parent!: boolean;
}
const createTableQuery = `CREATE TABLE IF NOT EXISTS comments(
  id SERIAL PRIMARY KEY,
        post INTEGER NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        rating INTEGER NOT NULL,
        parent BIGINT,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP)`;
client.query(createTableQuery, (error, result) => {
  if (error) {
    console.error("Error creating table", error);
  } else {
    console.log("Table created successfully");
  }
  client.end();
});
