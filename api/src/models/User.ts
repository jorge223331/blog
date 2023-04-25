import { IModel, Model, ModelInsertable } from "./Model.js";
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
export async function updateUser(u: UserInsertable, id: number) {
  const updated = new Date();
  const query = {
    text: "UPDATE users SET name = $1, email = $2 password = $3, isAdmin = $4, updated = $5, WHERE id = $6)",
    values: [u.name, u.email, u.password, u.isAdmin, updated, id],
  };
  client
    .query(query)
    .then(() => {
      console.log(`User #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export async function deleteUser(id: number) {
  const deleted = new Date();
  const query = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id, deleted],
  };
  client
    .query(query)
    .then(() => {
      console.log(`User #${id} deleted`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
