import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IUser } from "../../../api";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body as Pick<IUser, "id">;

  try {
    await db(usersTbl).where({ id }).del();
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
