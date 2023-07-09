import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";

export const queryUsers = async (req: Request, res: Response) => {
  const { queryString, currentUser } = req.body as {
    queryString?: string;
    currentUser: string;
  };
  try {
    const data = await db(usersTbl)
      .select(["id", "fullName", "user", "militaryBase", "position", "role"])
      .where("fullName", "ilike", `%${queryString ?? ""}%`)
      .orWhere("user", "ilike", `%${queryString ?? ""}%`)
      .andWhereNot("user", currentUser);

    return res.json(data);
  } catch (error) {
    console.error(error);
  }
};
