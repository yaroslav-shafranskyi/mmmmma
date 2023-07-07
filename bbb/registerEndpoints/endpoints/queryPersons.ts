import { Request, Response } from "express";

import { db } from "../../init";
import { briefsTbl, personsTbl } from "../../../constants";
import { IQuery, IPersonBrief, TableFilterType, ISort } from "../../../api";

import {
  convertTablePersonToIPerson,
  filterByRange,
  filterByString,
  sortData,
} from "../helpers";
import { queryPersonsFields, queryPersonsFilterFields } from "../constants";

export const queryPersons = async (req: Request, res: Response) => {
  const query = req.body as IQuery<IPersonBrief>;
  const { iterator, filterBy, sortBy } = query ?? {};
  const { page, rowsPerPage: limit } = iterator ?? { page: 0, rowsPerPage: Infinity};
  const offset = limit * page;

  try {
    const data = await db(personsTbl)
      .select([...queryPersonsFields, db.raw("count(*) OVER() AS full_count")])
      .modify(function (builder) {
        Object.entries(filterBy).forEach(([key, value]) => {
          if (
            queryPersonsFilterFields[TableFilterType.STRING].includes(key) ||
            queryPersonsFilterFields[TableFilterType.OPTIONS].includes(key)
          ) {
            filterByString(`_persons.${key}`, value, builder);
          }
          if (queryPersonsFilterFields[TableFilterType.RANGE].includes(key)) {
            filterByRange(`_persons.${key}`, value, builder);
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
        sortData(
          sortBy ?? ({ id: "asc" } as unknown as ISort<IPersonBrief>),
          builder
        );
      })
      .groupBy("_persons.id")
      .limit(limit)
      .offset(offset);

    return res.json({
      entities: data.map(convertTablePersonToIPerson),
      total: +(data[0]?.full_count ?? 0),
    });
  } catch (message) {
    return console.error(message);
  }
};
