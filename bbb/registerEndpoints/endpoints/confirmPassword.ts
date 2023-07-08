import { Request, Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";
import { IAuthorizationRequest, UserType } from "../../../api";

export const confirmPassword = async (req: Request, res: Response) => {
  const { user, password } = req.body as IAuthorizationRequest;

  try {
    const data = await db(usersTbl)
      .count()
      .where({ user })
      .andWhere({ password });

    console.log({ data });

    return res.json(data[0]?.count !== "0");
  } catch (error) {
    console.error(error);
  }
};
