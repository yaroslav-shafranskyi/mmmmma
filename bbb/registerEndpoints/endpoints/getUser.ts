import { Response } from "express";

import { db } from "../../init";
import { usersTbl } from "../../../constants";

export const getUser = async (id: number) => {
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
      .where({ id });

    return data[0];
  } catch (error) {
    console.error(error);
  }
};
