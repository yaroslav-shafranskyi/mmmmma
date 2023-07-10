import { Gender, TableFilterType } from "../../../api";

export const queryPersonsFields = [
  "_persons.id",
  "_persons.fullName",
  "_persons.personalId",
  "_persons.rank",
  "_persons.gender",
  "_persons.militaryBase",
  "_persons.birthDate",
  "_persons.updatedAt",
  "_persons.recordsQuantity",
  "_persons.lastForm100Id",
  "_persons.lastConclusionId",
  "_persons.lastDischargeId",
  "_persons.lastReferralId",
  "_persons.lastRecordDiagnosis",
];

export const queryPersonsFilterFields = {
  [TableFilterType.STRING]: ["fullName", "rank", "personalId", "militaryBase"],
  [TableFilterType.RANGE]: ["birthDate", "recordsQuantity"],
  [TableFilterType.OPTIONS]: ["gender"],
};
