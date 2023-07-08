import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IUser } from "../../../api";

export const updateUser = async (req: Request, res: Response) => {
  const { id, user, password, ...data } = req.body as IUser;

  try {
    await db(usersTbl)
      .update(data)
      .where({ user })
      .andWhere({ password })
      .andWhere({ id });
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
