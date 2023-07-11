import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { UserType } from "../../../api";

export const queryUsers = async (req: Request, res: Response) => {
  const { queryString } = req.body as {
    queryString?: string;
    currentUser: string;
  };
  try {
    const data = await db(usersTbl)
      .where(function () {
        this.where("fullName", "ilike", `%${queryString ?? ""}%`).orWhere(
          "user",
          "ilike",
          `%${queryString ?? ""}%`
        );
      })
      .andWhereNot({ role: UserType.SUPER_ADMIN })
      .select(["id", "fullName", "user", "militaryBase", "position", "role"]);
      
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
};
