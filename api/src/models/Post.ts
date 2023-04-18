import { IModel, Model, ModelInsertable } from "./Model.js";

export interface Post {
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

export class PostInsertable extends ModelInsertable<PostInsertable> {
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
export interface IPost extends Post, IModel {}

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
