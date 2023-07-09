import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IUser } from "../../../api";

export const createUser = async (req: Request, res: Response) => {
  const data = req.body as Omit<IUser, "id">;
  const { user } = data;

  try {
    await db(usersTbl).insert(data);

    const updatedUser = await db(usersTbl).select("password").where({ user });

    return res.json({ password: updatedUser[0]?.password });
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
