import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IAuthorizationRequest, IUser } from "../../../api";

export const getUser = async (req: Request, res: Response) => {
  const { user, password } = req.body as IAuthorizationRequest;

  try {
    const data = await db(usersTbl)
      .select([
        "user",
        "role",
        "fullName",
        "militaryBase",
        "clinic",
        "signature",
        "position",
        "id",
      ])
      .where({ user })
      .orWhere({ password });

    return res.json(data[0]);
  } catch (error) {
    console.error(error);
  }
};
