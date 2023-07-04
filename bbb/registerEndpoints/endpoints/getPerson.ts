import { Request, Response } from "express";

import { db } from "../../init";

import { convertTablePersonToIPerson } from "../helpers";
import { briefsTbl, personsTbl } from "../../../constants";

export const getPerson = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const data = await db(personsTbl).select("*").where({ id });

    const person = data[0];

    if (!person) {
      return res.json("Person not found!");
    }

    const records = await db(briefsTbl)
      .select(["id", "date", "fullDiagnosis", "type", "formId"])
      .where({ personId: id });

    return res.json({ ...convertTablePersonToIPerson(data[0]), records: records ?? [] });
  } catch (message) {
    return console.error(message);
  }
};
