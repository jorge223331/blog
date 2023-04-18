import { IModel, Model, ModelInsertable } from "./Model.js";

export interface Tag {
  name: string;
  slug: string;
}
export class TagInsertable extends ModelInsertable<TagInsertable> {
  name!: string;
  slug!: string;
}
export interface ITag extends Tag, IModel {}
export class Tag extends Model<ITag> {
  name!: string;
  slug!: string;
}
