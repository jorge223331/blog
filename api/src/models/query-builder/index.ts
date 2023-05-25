export type QueryStatement = "SELECT" | "INSERT" | "DELETE" | "UPDATE";
export type QueryFieldValueType = string | null | boolean | number;
export type QueryFieldValue = QueryFieldValueType | QueryFieldValueType[];
export enum QueryCondition {
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
export class QueryBuilder {
  statement: QueryStatement;
  field: string;
  conditions: string[];
  table: string;
  limit?: number;
  offset?: number;
  values: QueryFieldValue[][];
  columns: string[];
  res: string;

  constructor(statement: QueryStatement, table: string) {
    this.statement = statement;
    this.table = table;
    this.conditions = [];
    this.field = "*";
    this.values = [];
    this.columns = [];
    this.res = "";
  }

  select(fields: QueryStatement) {
    this.res = `${fields} ${this.field}`;
    // console.log(this.res)
    return this;
  }

  from(table: string) {
    this.res = `${this.res} FROM ${table}`;
    // console.log(this.res)
    return this;
  }

  where(condition: string) {
    this.conditions.push(condition);
    // console.log(this.conditions)
    return this;
  }

  insert(columns: string[], values: QueryFieldValue[][]) {
    this.columns = columns;
    this.values = values;
    // console.log(this.columns, this.values)
    return this;
  }

  delete(condition?: string) {
    if (condition) {
      this.conditions.push(condition);
    }
    // console.log(this.conditions)
    return this;
  }

  update(values: [string, QueryFieldValue][]) {
    let query = `UPDATE ${this.table} SET `;
    query += values.map(([column, value]) => `${column}=${value}`).join(", ");
    console.log(query);
    return this;
  }
  limitQuery(value: number) {
    this.limit = value;
    return this;
  }

  offsetQuery(value: number) {
    this.offset = value;
    return this;
  }

  build(): string {
    let query = "";
    switch (this.statement) {
      case "SELECT":
        query = `SELECT ${this.field} FROM ${this.table}`;
        if (this.conditions.length > 0) {
          query += ` WHERE ${this.conditions.join(" ")}`;
        }
        if (this.limit) {
          query += ` LIMIT ${this.limit}`;
        }
        if (this.offset) {
          query += ` OFFSET ${this.offset}`;
        }
        break;
      case "INSERT":
        query = `INSERT INTO ${this.table} (${this.columns.join(
          ", "
        )}) VALUES `;
        query += this.values.map((row) => `(${row.join(", ")})`).join(", ");
        console.log(query);
        break;
      case "DELETE":
        query = `DELETE FROM ${this.table}`;
        if (this.conditions.length) {
          query += ` WHERE ${this.conditions.join(" ")}`;
        }
        break;
      case "UPDATE":
        query = `UPDATE ${this.table} SET `;
        query += this.values
          .map(([column, value]) => `${column}=${value}`)
          .join(", ");
        if (this.conditions.length) {
          query += ` WHERE ${this.conditions.join(" ")}`;
        }
        break;
    }
    return query;
  }
}


// const queryBuilder = new QueryBuilder("SELECT", "users");
// const query = queryBuilder
//   .select("SELECT")
//   .from("users")
//   .where(`age ${QueryCondition.EQUAL} 18`)
//   .limitQuery(10)
//   .offsetQuery(5)
//   .build();
// console.log(query);

// const queryBuilder = new QueryBuilder("INSERT", "users");

// const columns = ["name", "age", "email"];
// const values = [
//   ["John", 30, "john@example.com"],
//   ["Alice", 25, "alice@example.com"],
// ];

// queryBuilder.insert(columns, values);
// console.log(queryBuilder.build())

// const queryBuilder = new QueryBuilder("DELETE", "users");
// const query = queryBuilder.delete(`age ${QueryCondition.LESS} 18`).build();
// console.log(query);

// const qb = new QueryBuilder("UPDATE", "users");
// qb.update([
//   ["name", "John"], ["age", 25], ["gender", "male"],
//   ["name", "Alice"], ["age", 30], ["gender", "female"]
// ]);

// //  *********************
// const result = new QueryBuilder("SELECT", "users")
//   .select("SELECT")
//   .from("users")
//   .where("user_name");
// export class Selector {
//   result: string;
//   constructor() {
//     this.result = "";
//   }
//   select(fields: string) {
//     this.result = `SELECT ${fields}`;
//     return this;
//   }
//   from(table: string) {
//     this.result = `${this.result} FROM ${table}`;
//     return this;
//   }
//   where(fields: string) {
//     this.result = `${this.result} WHERE ${fields}`;
//     return this;
//   }
//   orWhere(fields: string) {
//     this.result = `${this.result} OR ${fields}`;
//     console.log(this.result);
//     return this;
//   }
// }
// const selector = new Selector();

// const finalResult = selector
//   .select("*")
//   .from("users")
//   .where("first_name")
//   .orWhere("last_name").result;
