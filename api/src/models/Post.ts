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
