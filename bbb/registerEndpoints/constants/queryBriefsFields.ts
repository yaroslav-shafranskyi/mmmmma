import { TableFilterType } from "../../../api";

export const queryBriefsPersonFields = [
  "_persons.fullName",
  "_persons.personalId",
  "_persons.tokenNumber",
  "_persons.birthDate",
  "_persons.rank",
  "_persons.gender",
  "_persons.militaryBase",
];

export const queryBriefsFilterFields = {
  [TableFilterType.STRING]: [
    "fullName",
    "rank",
    "personalId",
    "militaryBase",
    "fullDiagnosis",
  ],
  [TableFilterType.RANGE]: ["birthDate", "recordDate"],
  [TableFilterType.OPTIONS]: ["gender", "type"],
};
