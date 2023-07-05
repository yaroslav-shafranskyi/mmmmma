import { Request, Response } from "express";

import { db } from "../../init";
import { briefsTbl, personsTbl } from "../../../constants";

import { convertTablePersonToIPerson } from "../helpers";

export const queryPersons = async (_req: Request, res: Response) => {
  try {

    const allPersons = await db(personsTbl);

    const data = await db(personsTbl)
      .select([
        "_persons.id",
        "_persons.fullName",
        "_persons.personalId",
        "_persons.rank",
        "_persons.gender",
        "_persons.militaryBase",
        "_persons.updatedAt",
        "_persons.recordsQuantity"
      ])
      .join(briefsTbl, "_briefs.personId", "=", "_persons.id")
      .select(["_briefs.fullDiagnosis"])
      .orderBy("_briefs.id", "desc")
      .limit(1);

    return res.json({
      entities: data.map(person => ({
        ...convertTablePersonToIPerson(person),
        lastRecordDiagnosis: person.fullDiagnosis        
    })),
      total: data.length,
    });
  } catch (message) {
    return console.error(message);
  }
};
