import { Knex } from "knex";

import { ISort } from "../../../../api";

export const sortData = <T extends object>(
  value: ISort<T> | undefined,
  builder: Knex.QueryBuilder
) => {
  if (!value) {
    return;
  }
  for (const key in value) {
    const order = value[key].toLowerCase();
    builder.orderBy(key, order);
  }
};
