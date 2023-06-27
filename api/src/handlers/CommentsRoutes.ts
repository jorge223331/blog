import express, { Request, Response } from "express";
import {
  CommentInsertable,
  createComment,
  deleteComment,
  ICommentInsertable,
} from "../models/Comments.js";

const router = express.Router();

router.post("/comments", async (req: Request, res: Response) => {
  try {
    const { post, author, content, rating, parent } = req.body;
    const commentData: ICommentInsertable = {
      post,
      author,
      content,
      rating,
      parent,
    };

    const commentInsertable = new CommentInsertable(commentData);

    await createComment(commentInsertable);

    res.sendStatus(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/comments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteComment(parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
