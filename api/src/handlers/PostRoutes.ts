import express, { Request, Response } from "express";
import {
  IPostInsertable,
  PostInsertable,
  createPost,
  updatePost,
  deletePost,
} from "../models/Post.js";

const router = express.Router();

router.post("/posts", async (req: Request, res: Response) => {
  try {
    const postData: IPostInsertable = req.body;

    await createPost(postData);

    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postData: Partial<IPostInsertable> = req.body;

    await updatePost(parseInt(id, 1), postData);

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/posts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deletePost(parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
