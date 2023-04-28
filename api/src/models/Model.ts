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
  limit(n: number): QueryBuilder;
  offset(n: number): QueryBuilder;
  builder(): string;
}

class IQueryBuilder {
  queryStatement: QueryStatement | null = null;
  selectFields: string[] = [];
  tableQuery: string = "";
  whereQueries: [string, QueryCondition, QueryFieldValue][] = [];
  limitQuery: number | null = null;
  offsetQuery: number | null = null;

  select(key: string[]): QueryBuilder {
    if (this.queryStatement !== null) {
      throw new Error("Cannot set SELECT statement more than once");
    }
    this.queryStatement = "SELECT";
    this.selectFields = key;
    return this;
  }
  // insert(): QueryBuilder {
  //   if (this.queryStatement !== null) {
  //     throw new Error("Cannot set INSERT statement more than once");
  //   }
  //   this.queryStatement = "INSERT";
  //   return this;
  // }
  // delete(): QueryBuilder {
  //   if (this.queryStatement !== null) {
  //     throw new Error("Cannot set DELETE statement more than once");
  //   }
  //   this.queryStatement = "DELETE";
  //   return this;
  // }
  // update(): QueryBuilder {
  //   if (this.queryStatement !== null) {
  //     throw new Error("Cannot set UPDATE statement more than once");
  //   }
  //   this.queryStatement = "UPDATE";
  //   return this;
  // }

  from(table: string): QueryBuilder {
    if (this.tableQuery !== null) {
      throw new Error("Cannot set FROM table more than once");
    }
    this.tableQuery = table;
    return this;
  }

  where(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder {
    this.whereQueries.push([key, condition, value]);
    return this;
  }

  andWhere(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder {
    return this.where(key, condition, value);
  }

  orWhere(
    key: string,
    condition: QueryCondition,
    value: QueryFieldValue
  ): QueryBuilder {
    this.whereQueries.push([key, condition, value]);
    return this;
  }

  limit(n: number): QueryBuilder {
    if (this.limitQuery !== null) {
      throw new Error("Cannot set LIMIT more than once");
    }
    this.limitQuery = n;
    return this;
  }

  offset(n: number): QueryBuilder {
    if (this.offsetQuery !== null) {
      throw new Error("Cannot set OFFSET more than once");
    }
    this.offsetQuery = n;
    return this;
  }

  builder(): string {
    let query = `${this.queryStatement} ${this.selectFields.join(", ")} ${
      this.tableQuery
    }`;
  }
}
