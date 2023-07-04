import { Request, Response } from "express";

import { db } from "../../init";
import { forms100Tbl, personsTbl } from "../../../constants";

export const getForm100 = async (req: Request, res: Response) => {
  const { id: stringId, personId: stringPersonId } = req.body;

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== "create";

  const id = +stringId;
  const personId = +stringPersonId;

  try {
    if (!doesPersonExist) {
      return res.json(undefined);
    }

    if (isCreateMode) {
      const data = await db(personsTbl)
        .select([
          "fullName",
          "personalId",
          "tokenNumber",
          "rank",
          "gender",
          "militaryBase",
        ])
        .where({ id: personId });
      return res.json(data?.[0]);
    }

    const data = await db(forms100Tbl)
      .select("*")
      .where({ '_forms100.id': id })
      .andWhere({ '_forms100.personId': personId })
      .join(personsTbl, `${personsTbl}.id`, "=", `${forms100Tbl}.personId`)
      .select(
        `${personsTbl}.fullName`,
        `${personsTbl}.personalId`,
        `${personsTbl}.tokenNumber`,
        `${personsTbl}.rank`,
        `${personsTbl}.gender`,
        `${personsTbl}.militaryBase`
      );

    return res.json(data[0]);
  } catch (error) {
    return console.error(error);
  }
};
