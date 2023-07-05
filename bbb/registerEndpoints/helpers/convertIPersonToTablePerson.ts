import { IPerson } from "../../../api";

type PersonType = Omit<IPerson, "id"> & {
  id?: number;
};

export const convertIPersonToTablePerson = (person: PersonType) => {
  const { lastRecords, address, records, ...restPerson } = person;

  const {
    form100: lastForm100Id,
    discharge: lastDischargeId,
    conclusion: lastConclusionId,
    referral: lastReferralId,
  } = lastRecords ?? {};

  return {
    ...restPerson,
    ...(address ?? {}),
    lastForm100Id,
    lastDischargeId,
    lastConclusionId,
    lastReferralId,
  };
};
