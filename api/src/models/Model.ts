export interface IModel {
  id: number;
  created: number;
  updated: number;
}
export class Model<Type extends IModel> {
  id!: number;
  created!: number;
  updated!: number;
  constructor(data: Type) {
    const self = this as any;
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        self[k] = data[k];
      }
    }
  }
}
export class ModelInsertable<Type extends Record<string, any>> {
  id!: number;
  created!: number;
  updated!: number;
  constructor(data: Type) {
    const self = this as any;
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        self[k] = data[k];
      }
    }
  }
}
type QueryStatement = "SELECT" | "INSERT" | "DELETE" | "UPDATE";
type QueryFieldValueType = string | null | boolean | number;
type QueryFieldValue = QueryFieldValueType | QueryFieldValueType[]
type QueryCondition = "=" | "<" | ">" | "!=" | ">=" | "<=";
type QueryConditionIn = "IN";
type QueryConditionLike = "LIKE";
type QueryConditionBetween = "BETWEEN";
type QueryConditionValue = "AND" |"OR";

class WhereQuery extends String {
  constructor (
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValue, null>
    condition: 
  )
}
