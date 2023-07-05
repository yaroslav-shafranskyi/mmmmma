import { IAddress } from "./IAddress";
import { Gender } from "./Gender";
import { ILastRecords, IRecords } from "./IRecord";
import { Rank } from "./Rank";

export interface IPerson {
  id: number;
  fullName: string;
  personalId?: string;
  tokenNumber: string;
  birthDate?: Date;
  rank: Rank;
  gender: Gender;
  militaryBase: string; // TODO declare type
  records: IRecords;
  lastRecords: ILastRecords;
  phoneNumber?: string;
  address?: IAddress;
  profession?: string;
}

export interface ITablePerson extends Omit<IPerson, "address" | "lastRecords"> {
  oblast?: string | null;
  region?: string | null;
  settlement?: string | null;
  building?: string | null;
  street?: string | null;
  appartments?: string | null;
  lastConclusionId?: number | null;
  lastDischargeId?: number | null;
  lastForm100Id?: number | null;
  lastReferralId?: number | null;
  updatedAt?: string | null;
}

export interface IPersonBrief extends Omit<IPerson, 'records' | 'lastRecords'> {
  updatedAt?: Date;
  lastRecordDiagnosis?: string;
  recordsQuantity?: number;
}
