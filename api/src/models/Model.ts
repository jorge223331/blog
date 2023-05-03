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
  BETWEEN = "BETWEEN",
  LIKE = "LIKE",
  IN = "IN",
  AND = "AND",
  OR = "OR",
}

// SELECT * FROM users WHERE first_name and last_name
// SELECT id FROM posts WHERE first_name or last_name
// SELECT id,author FROM comments WHERE first_name

class QueryBuilder {
  statement: QueryStatement;
  field: string;
  conditions: QueryCondition[];
  table: string;
  limit?: number;
  offset?: number;
  res = "";

  constructor(statement: QueryStatement, table: string) {
    this.statement = statement;
    this.table = table;
    this.conditions = [];
    this.field = "*";
    this.res = "";
  }

  select(fields: QueryStatement) {
    this.res = `${fields} ${this.field}`;
    console.log(this.res);
    return this;
  }

  from(table: string) {
    this.res = `${this.res} FROM ${table}`;
    console.log(this.res);
    return this;
  }

  where(fields: string) {
    this.res = `${this.res} WHERE ${fields}`;
    console.log(this.res);
    return this;
  }

  build() {
    console.log(this.res);
    return this.res;
  }
}
const result = new QueryBuilder("SELECT", "users")
  .select("SELECT")
  .from("users")
  .where("user_name");
export class Selector {
  result: string;
  constructor() {
    this.result = "";
  }
  select(fields: string) {
    this.result = `SELECT ${fields}`;
    return this;
  }
  from(table: string) {
    this.result = `${this.result} FROM ${table}`;
    return this;
  }
  where(fields: string) {
    this.result = `${this.result} WHERE ${fields}`;
    return this;
  }
  orWhere(fields: string) {
    this.result = `${this.result} OR ${fields}`;
    console.log(this.result);
    return this;
  }
}
const selector = new Selector();

const finalResult = selector
  .select("*")
  .from("users")
  .where("first_name")
  .orWhere("last_name").result;
