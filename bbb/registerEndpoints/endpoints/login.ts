import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IAuthorizationRequest, UserType } from "../../../api";

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body as IAuthorizationRequest;

  try {
    const data = await db(usersTbl)
      .select([
        "id",
        "role",
        "fullName",
        "militaryBase",
        "clinic",
        "signature",
        "position",
        "user",
        "phone",
        "email",
        "rank",
        "subdivision",
      ])
      .where({ user })
      .andWhere({ password });

    return res.json(data[0] ?? { role: UserType.NONE });
  } catch (error) {
    console.error(error);
  }
};
