import { IModel, Model, ModelInsertable } from "./Model.js";

export interface ICommentInsertable {
  id: number;
  author: string;
  content: string;
  created: string;
}
export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  author!: string;
  content!: string;
}
export interface IComment extends ICommentInsertable, IModel{}

export class Comment extends Model<IComment> {
  author!: string;
  content!: string;
}

