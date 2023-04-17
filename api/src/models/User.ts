import { Client } from "pg";
import { IModel, Model, ModelInsertable } from "./Model.js";
import pg from "pg";
import { client } from "../db.js";

export interface IUserInsertable {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export class UserInsertable extends ModelInsertable<IUserInsertable> {
  name!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  async create() {
    let columns = [];
    let values = [];
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const element = this[key];
        columns.push(key);
        values.push(this[key]);
      }
    }
    const query = `INSERT INTO users (${columns.join(",")})(${values
      .map((v) => (typeof v === "string" ? `'${v}'` : v))
      .join(",")})`;
    return await client.query(query);
  }
}
export interface IUser extends Omit<IUserInsertable, "password">, IModel {}
export class User extends Model<IUser> {
  name!: string;
  email!: string;
  isAdmin!: boolean;
}
