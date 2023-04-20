import { IModel, Model, ModelInsertable } from "./Model.js";

export interface ITagInsertable {
  name: string;
  slug: string;
}
export class TagInsertable extends ModelInsertable<ITagInsertable> {
  name!: string;
  slug!: string;
}
export interface ITag extends ITagInsertable, IModel {}
export class Tag extends Model<ITag> {
  name!: string;
  slug!: string;
}
