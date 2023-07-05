import { IAddress } from "./IAddress";
import { Gender } from "./Gender";
import { IBriefRecord, ILastRecords } from "./IRecord";
import { Rank } from "./Rank";

export interface IPerson {
  id: number;
  fullName: string;
  personalId?: string;
  tokenNumber: string;
  birthDate?: number;
  rank: Rank;
  gender: Gender;
  militaryBase: string; // TODO declare type
  records: IBriefRecord[];
  lastRecords: ILastRecords;
  phoneNumber?: string;
  address?: IAddress;
  profession?: string;
  updatedAt?: number;
  lastRecordDiagnosis?: string;
  recordsQuantity?: number;
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
  updatedAt?: number | null;
}

export type PersonBrief = Omit<IPerson, "records" | "lastRecords">;
