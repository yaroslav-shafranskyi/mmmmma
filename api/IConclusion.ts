import { ICommonFormHeaderFields } from "./ICommonFormHeaderFields";
import { IPerson } from "./IPerson";

export type ConclusionPersonDataType = Pick<
  IPerson,
  "id" | "fullName" | "birthDate"
>;

export interface IConclusion extends ICommonFormHeaderFields {
  id: number;
  person: ConclusionPersonDataType;
  sender: string;
  doctor: string;
  labResults: string;
  researchResults: string;
  diagnosis: string;
  recommendations: string;
  date: number;
  signature: string;
  headOfTheClinic: string;
}

export interface ITableConclusion extends Omit<IConclusion, "order" | 'person'> {
  orderDate: number;
  orderNumber: string;
  personId: number;
}
