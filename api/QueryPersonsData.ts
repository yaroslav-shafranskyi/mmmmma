import { IPersonBrief } from "./IPerson";

export interface QueryPersonsData {
  entities: IPersonBrief[];
  total: number;
}
