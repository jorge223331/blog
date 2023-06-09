import express, { Request, Response } from "express";
import {
  CategoryInsertable,
  createCategory,
  updateCategory,
  deleteCategory,
  ICategoryInsertable,
} from "../models/Category.js";

const router = express.Router();

router.post("/categories", (req: Request, res: Response) => {
  const { name, link, slug } = req.body;

  const categoryData: ICategoryInsertable = {
    name,
    link,
    slug,
  };

  const categoryInsertable = new CategoryInsertable(categoryData);

  createCategory(categoryInsertable)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error: Error) => {
      res.status(500).send(error.message);
    });
});

router.put("/categories/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, link, slug } = req.body;

  const categoryData: ICategoryInsertable = {
    name,
    link,
    slug,
  };

  const categoryInsertable = new CategoryInsertable(categoryData);

  updateCategory(categoryInsertable, parseInt(id, 10))
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error: Error) => {
      res.status(500).send(error.message);
    });
});

router.delete("/categories/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  deleteCategory(parseInt(id, 10))
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error: Error) => {
      res.status(500).send(error.message);
    });
});

export default router;
