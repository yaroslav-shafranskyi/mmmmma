import { IPerson, ITablePerson } from "../../../api";

export const convertTablePersonToIPerson = (
  tablePerson: ITablePerson
): IPerson => {
  if (!tablePerson) {
    return;
  }

  const {
    oblast,
    region,
    settlement,
    street,
    building,
    appartments,
    lastConclusionId,
    lastDischargeId,
    lastForm100Id,
    lastReferralId,
    ...restFields
  } = tablePerson;

  return {
    ...(restFields as unknown as IPerson),
    address: {
      oblast: oblast as string,
      region: region as string,
      settlement: settlement as string,
      building: building as string,
      street: street as string,
      appartments: appartments as string,
    },
    lastRecords: {
      conclusion: lastConclusionId,
      discharge: lastDischargeId,
      form100: lastForm100Id,
      referral: lastReferralId,
    },
  };
};
