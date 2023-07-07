import { Request, Response } from "express";

import { db } from "../../init";
import { briefsTbl, personsTbl } from "../../../constants";
import { IQuery, IPersonBrief, TableFilterType } from "../../../api";

import {
  convertTablePersonToIPerson,
  filterByRange,
  filterByString,
  getPaginatedData,
  sortBy,
} from "../helpers";
import { queryPersonsFields, queryPersonsFilterFields } from "../constants";

export const queryPersons = async (req: Request, res: Response) => {
  const query = req.body as IQuery<IPersonBrief>;

  try {
    const data = await db(personsTbl)
      .select(queryPersonsFields)
      .modify(function (builder) {
        Object.entries(query.filterBy).forEach(([key, value]) => {
          if (
            queryPersonsFilterFields[TableFilterType.STRING].includes(key) ||
            queryPersonsFilterFields[TableFilterType.OPTIONS].includes(key)
          ) {
            filterByString(key, value, builder);
          }
          if (queryPersonsFilterFields[TableFilterType.RANGE].includes(key)) {
            filterByRange(key, value, builder);
          }
          if (key === "fullDiagnosis") {
            builder.join(briefsTbl, "_briefs.personId", "=", "_persons.id");
            filterByString("_briefs.fullDiagnosis", value, builder);
          }
          if (key === "recordDate") {
            builder.join(briefsTbl, "_briefs.personId", "=", "_persons.id");
            filterByRange("_briefs.date", value as [number, number], builder);
          }
          if (key === "Any" && !!value) {
            builder
              .join(briefsTbl, "_briefs.personId", "=", "_persons.id")
              .where("_persons.fullName", "ilike", `%${value}%`)
              .orWhere("_briefs.fullDiagnosis", "ilike", `%${value}%`);
          }
        });
        sortBy(query.sortBy, builder);
      })
      .groupBy("_persons.id");

    const paginatedData = getPaginatedData(data, query.iterator);

    return res.json({
      entities: paginatedData.map(convertTablePersonToIPerson),
      total: data.length,
    });
  } catch (message) {
    return console.error(message);
  }
};
