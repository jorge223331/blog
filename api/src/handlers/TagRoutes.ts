import express, { Request, Response } from "express";
import {
  TagInsertable,
  createTag,
  updateTag,
  deleteTag,
  ITagInsertable,
} from "../models/Tag.js";

const router = express.Router();

router.post("/tags", async (req: Request, res: Response) => {
  try {
    const { name, link, slug } = req.body;
    const tagData: ITagInsertable = {
      name,
      link,
      slug,
    };

    const tagInsertable = new TagInsertable(tagData);

    await createTag(tagInsertable);

    res.sendStatus(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/tags/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, link, slug } = req.body;
    const tagData: ITagInsertable = {
      name,
      link,
      slug,
    };

    const tagInsertable = new TagInsertable(tagData);

    await updateTag(tagInsertable, parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/tags/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteTag(parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
