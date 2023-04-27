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
type QueryFieldValue = QueryFieldValueType | QueryFieldValueType[];
enum QueryCondition {
  EQUAL = "=",
  LESS = "<",
  GREATER = ">",
  LESS_OR_EQUAL = "<=",
  GREATER_OR_EQUAL = ">=",
  NOT_EQUAL = "!=",
  LIKE = "LIKE",
  IN = "IN",
  BETWEEN = "BETWEEN",
}
enum QueryConditionValue {
  AND = "AND",
  OR = "OR",
}
interface QueryBuilder {
  select(key: string[]): QueryBuilder;
  from(table: string): QueryBuilder;
  where(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder;
  andWhere(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder;
  orWhere(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder;
  limit(limit: number): QueryBuilder;
  offset(offset: number): QueryBuilder;
  building(): string;
}

export class SimpleQueryBuilder implements QueryBuilder {
  private statement: QueryStatement = "SELECT";
  private fields: string[] = [];
  private table?: string;
  private conditions: [string, QueryCondition, QueryFieldValue][] = [];
  private limitValue?: number;
  private offsetValue?: number;

  select(fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }
  from(table: string): QueryBuilder {
    this.table = table;
    return this;
  }
}
