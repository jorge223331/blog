import express from "express";
import { QueryCondition } from "./models/query-builder/index.js";
import { Category } from "./models/Category.js";
import { Tag } from "./models/Tag.js";
import { Comment } from "./models/Comments.js";
import { QueryBuilder } from "./models/query-builder/index.js";
import { client } from "./db.js";
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import categoryRoutes from "./handlers/CategoryRoutes.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());
app.use("/", categoryRoutes);

// const columns = ["name", "link", "slug"];
// const values = ["John", "asd", "john@example.com"];
// const query = new QueryBuilder("INSERT", "categories")
//   .insert(columns, values)
//   .build();
// console.log(client.query(query));

// console.log(Comment);

// const columns = ["post", "content", "author", "rating", "parent"];
// const values = [1, "some-content", 2, 5, 1];
// const query = new QueryBuilder("INSERT", "comments")
//   .insert(columns, values)
//   .build();
// console.log(client.query(query));

// console.log(Tag);

// const columns = ["name", "link", "slug"];
// const values = ["IT", "https://blog.george", "some-content"];
// const query = new QueryBuilder("INSERT", "tags")
//   .insert(columns, values)
//   .build();
// console.log(client.query(query));

// console.log(User);

// const columns = ["name", "email", "password", "admin"];
// const values = ["George", "masvidjorge@gmail.com", "12344jorge2", true];
// const query = new QueryBuilder("INSERT", "users")
//   .insert(columns, values)
//   .build();

// console.log(client.query(query));

// console.log(Post);

// const columns = [
//   "title",
//   "description",
//   "link",
//   "slug",
//   "content",
//   "tags",
//   "category",
//   "status",
//   "author",
//   "comments",
// ];
// const values = [
//   "test-article",
//   "test",
//   "yellow.com",
//   "url",
//   "PostgreSQL",
//   "{15}",
//   12,
//   "new",
//   "John",
//   "{2}",
// ];

// const query = new QueryBuilder("INSERT", "posts")
//   .insert(columns, values)
//   .build();
// console.log(client.query(query));

// const query = new QueryBuilder("SELECT", "users")
//   .select("SELECT")
//   .from("users")
//   .where("name", QueryCondition.EQUAL, "'George'")
//   .build();
// console.log(await client.query(query));

// const query = new QueryBuilder("DELETE", "users")
//   .delete("name = 'George'")
//   .build();
// console.log(await client.query(query));

// const values = {
//   name: "George",
//   password: "85845864asd",
// };
// const query = new QueryBuilder("UPDATE", "users")
//   .update(values)
//   .where("name", QueryCondition.EQUAL, "'Jorge'")
//   .build();

// console.log(await client.query(query));
