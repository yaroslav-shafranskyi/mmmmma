import { Knex } from "knex";
import { checkIfNullish } from "../checkIfNullish";

export const filterByString = (
  key: string,
  value: unknown,
  builder: Knex.QueryBuilder
) => {
  if (checkIfNullish(value)) {
    return;
  }
  builder.where(key, "ilike", `%${value}%`);
};
