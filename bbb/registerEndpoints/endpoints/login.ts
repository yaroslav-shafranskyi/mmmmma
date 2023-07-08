import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { UserType } from "../../../api";

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  try {
    const data = await db(usersTbl)
      .select("role")
      .where({ user })
      .andWhere({ password });

    return res.json(data[0] ?? { role: UserType.NONE });
  } catch (error) {
    console.error(error);
  }
};
