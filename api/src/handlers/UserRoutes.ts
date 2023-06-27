import express, { Request, Response } from "express";
import {
  createUser,
  UserInsertable,
  updateUser,
  deleteUser,
  IUserInsertable,
} from "../models/User.js";

const router = express.Router();

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const userData: IUserInsertable = {
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    };

    await createUser(userData);

    res.sendStatus(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;

    const userData: IUserInsertable = {
      name,
      email,
      password,
      isAdmin,
    };

    await updateUser(userData, parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUser(parseInt(id, 10));

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
