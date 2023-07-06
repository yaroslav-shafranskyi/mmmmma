import { Request, Response } from "express";

import { db } from "../../init";
import { personsTbl } from "../../../constants";
import { IQuery, IPersonBrief, TableFilterType } from "../../../api";

import { convertTablePersonToIPerson } from "../helpers";
import { queryPersonsFields, queryPersonsFilterFields } from "../constants";

export const queryPersons = async (req: Request, res: Response) => {
  const query = req.body as IQuery<IPersonBrief>;
  try {
    const data = await db(personsTbl)
      .select(queryPersonsFields)
      .modify(function (builder) {
        Object.entries(query.filterBy).forEach(([key, value]) => {
          if (
            (queryPersonsFilterFields[TableFilterType.STRING].includes(key) ||
              queryPersonsFilterFields[TableFilterType.OPTIONS].includes(
                key
              )) &&
            !!value
          ) {
            builder.where(`_persons.${key}`, "ilike", `%${value}%`);
          }
          if (
            queryPersonsFilterFields[TableFilterType.RANGE].includes(key) &&
            value !== undefined
          ) {
            const range = value as [number, number];
            const hasOnlyFirstValue =
              range[0] === undefined && range[1] !== undefined;
            const hasOnlySecondValue =
              range[0] !== undefined && range[1] === undefined;
            const hasBothValues =
              range[0] !== undefined && range[1] !== undefined;

            if (hasOnlyFirstValue) {
              builder.where(`_persons.${key}`, "<=", range[1]);
            }
            if (hasOnlySecondValue) {
              builder.where(`_persons.${key}`, ">=", range[0]);
            }
            if (hasBothValues) {
              builder.whereBetween(key, value as [number, number]);
            }
          }
        });
        if (query.sortBy !== undefined) {
          for (const key in query.sortBy) {
            const order = query.sortBy[key].toLowerCase();
            builder.orderBy(key, order);
          }
        }
        if (query.iterator !== undefined) {
          const limit = query.iterator.rowsPerPage;
          const offset = query.iterator.page * limit;
          builder.limit(limit);
          builder.offset(offset);
        }
      });

    const count = await db(personsTbl).count();

    return res.json({
      entities: data.map(convertTablePersonToIPerson),
      total: count[0]?.count ?? data.length,
    });
  } catch (message) {
    return console.error(message);
  }
};
