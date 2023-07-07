import { Knex } from "knex";
import { checkIfNullish } from "../checkIfNullish";

export const filterByRange = (
  field: string,
  value: unknown,
  builder: Knex.QueryBuilder
) => {
  if (checkIfNullish(value)) {
    return;
  }
  const range = value as [number, number];
  const hasOnlyFirstValue =
    checkIfNullish(range[0]) && !checkIfNullish(range[1]);
  const hasOnlySecondValue =
    !checkIfNullish(range[0]) && checkIfNullish(range[1]);
  const hasBothValues = !checkIfNullish(range[0]) && !checkIfNullish(range[1]);

  if (hasOnlyFirstValue) {
    builder.where(field, "<=", range[1]);
  }
  if (hasOnlySecondValue) {
    builder.where(field, ">=", range[0]);
  }
  if (hasBothValues) {
    builder.whereBetween(field, range);
  }
};
