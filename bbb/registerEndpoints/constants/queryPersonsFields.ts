import { Gender, TableFilterType } from "../../../api";

export const queryPersonsFields = [
  "id",
  "fullName",
  "personalId",
  "rank",
  "gender",
  "militaryBase",
  "updatedAt",
  "recordsQuantity",
  "birthDate",
  "lastForm100Id",
  "lastConclusionId",
  "lastDischargeId",
  "lastReferralId",
  "lastRecordDiagnosis",
];

export const queryPersonsFilterFields = {
  [TableFilterType.STRING]: ["fullName", "rank", "personalId", "militaryBase"],
  [TableFilterType.RANGE]: ["birthDate", "recordsQuantity"],
  [TableFilterType.OPTIONS]: ["gender"],
};
