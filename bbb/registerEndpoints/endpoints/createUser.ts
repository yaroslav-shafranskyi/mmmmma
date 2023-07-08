import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IUser } from "../../../api";

export const createUser = async (req: Request, res: Response) => {
  const { user, password, ...data } = req.body as Omit<IUser, "id">;

  try {
    await db(usersTbl).insert(data).where({ user }).andWhere({ password });
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
