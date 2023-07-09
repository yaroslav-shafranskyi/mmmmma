import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IUser } from "../../../api";

export const updateUser = async (req: Request, res: Response) => {
  const data = req.body as Pick<IUser, "id" | "role">;
  const { id } = data;

  try {
    await db(usersTbl).update(data).where({ id });
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
