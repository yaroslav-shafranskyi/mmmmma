import { PersonBrief } from "./IPerson";

export interface QueryPersonsData {
  entities: PersonBrief[];
  total: number;
}
