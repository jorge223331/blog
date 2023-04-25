import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";
export interface ICommentInsertable {
  content: string;
  author: string;
  parent: boolean;
  rating: string;
}
export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  content!: string;
  author!: string;
  parent!: boolean;
  rating!: string;
}
export async function createComment(c: CommentInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO comments (content, author, parent, rating, created) VALUES ($1, $2, $3, $4, $5)",
    values: [c.content, c.author, c.parent, c.rating, created],
  };
  client
    .query(query)
    .then(() => {
      console.log(
        `Comment ${(c.content, c.author, c.parent, c.rating)} created`
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
  content!: string;
  author!: string;
  parent!: boolean;
  rating!: string;
}
