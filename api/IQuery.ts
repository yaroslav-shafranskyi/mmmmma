export interface Iterator {
  page: number;
  rowsPerPage: number;
}

export interface IFilter {
  [field: string]: unknown;
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type ISort<TData extends object> = {
  [field in keyof TData]: SortOrder;
};

export interface IQuery<TData extends object> {
  iterator: Iterator;
  sortBy?: ISort<TData>;
  filterBy: IFilter;
}

export enum TableFilterType {
  STRING = "string",
  RANGE = "Range",
  OPTIONS = "Options",
  NUMBER = "Number",
}
