import { Request, Response } from "express";

import { db } from "../../init";
import { briefsTbl, personsTbl } from "../../../constants";
import { IBriefRecord, IQuery, TableFilterType } from "../../../api";

import { queryBriefsFilterFields, queryBriefsPersonFields } from "../constants";
import { filterByRange, filterByString } from "../helpers";

export const queryBriefs = async (req: Request, res: Response) => {
  const { id, query } = req.body as { id: number; query: IQuery<IBriefRecord> };

  const { iterator, filterBy, sortBy } = query ?? {};
  const { page, rowsPerPage: limit } = iterator ?? {
    page: 0,
    rowsPerPage: Infinity,
  };
  const offset = limit * page;

  try {
    const data = await db(briefsTbl)
      .select(["_briefs.*", db.raw("count(*) OVER() AS total")])
      .where("_briefs.doctorId", "=", `${id}`)
      .join(personsTbl, "_persons.id", "=", "_briefs.personId")
      .select(queryBriefsPersonFields)
      .modify(function (builder) {
        Object.entries(filterBy).forEach(([key, value]) => {
          if (
            queryBriefsFilterFields[TableFilterType.STRING].includes(key) ||
            queryBriefsFilterFields[TableFilterType.OPTIONS].includes(key)
          ) {
            filterByString(`_persons.${key}`, value, builder);
          }
          if (queryBriefsFilterFields[TableFilterType.RANGE].includes(key)) {
            filterByRange(`_persons.${key}`, value, builder);
          }
          if (key === "Any" && !!value) {
            builder
              .where("_persons.fullName", "ilike", `%${value}%`)
              .orWhere("_briefs.fullDiagnosis", "ilike", `%${value}%`);
          }
        });
      })
      .limit(limit)
      .offset(offset);

    return res.json({
        entities: data,
        total: +(data[0]?.total ?? 0)
    });
  } catch (error) {
    console.error(error);
  }
  return res.end();
};
