import { Iterator } from "../../../../api";

export const getPaginatedData = (data: unknown[], iterator?: Iterator) => {
  const { page, rowsPerPage: limit } = iterator ?? {};
  const offset = page * limit;

  const slicedData =
    limit === undefined || offset === undefined
      ? data
      : data.slice(offset, offset + limit);

  return slicedData;
};
