import { IModel, Model, ModelInsertable } from "./Model.js";
import { client } from "../db.js";

export interface IUserInsertable {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export async function createUser(data: IUserInsertable) {
  const created = new Date();

  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`);

  const query = `INSERT INTO users (${columns.join(
    ","
  )}) VALUES (${placeholders.join(",")})`;

  try {
    await client.query(query, values);
    console.log(`User ${data.name} created`);
  } catch (err) {
    throw new Error(String(err));
  }
}
export class UserInsertable extends ModelInsertable<IUserInsertable> {
  name!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
}

export interface IUser extends Omit<IUserInsertable, "password">, IModel {}
export class User extends Model<IUser> {
  name!: string;
  email!: string;
  isAdmin!: boolean;
}
export async function updateUser(data: IUserInsertable, id: number) {
  const updated = new Date();

  const query = {
    text: "UPDATE users SET name = $1, email = $2, password = $3, isAdmin = $4, updated = $5 WHERE id = $6",
    values: [data.name, data.email, data.password, data.isAdmin, updated, id],
  };

  try {
    await client.query(query);
    console.log(`User #${id} updated`);
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function deleteUser(id: number) {
  const query = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id],
  };

  try {
    await client.query(query);
    console.log(`User #${id} deleted`);
  } catch (err) {
    throw new Error(String(err));
  }
}
const createTableQuery = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP)`;
client.query(createTableQuery, (error, result) => {
  if (error) {
    console.error("Error creating table", error);
  } else {
    console.log("Table created successfully");
  }
  // client.end();
});
