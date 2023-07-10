import { ITableDischarge, IDischarge, IPerson } from "../../../../api";

export const convertITableDischargeToIDischarge = (
  data: ITableDischarge
): IDischarge => {
  const {
    sickDate,
    referralDate,
    arrivalDate,
    leavingDate,
    personId,
    orderDate,
    orderNumber,
    ...restData
  } = data;

  return {
    ...restData,
    datesData: {
      sick: sickDate,
      referral: referralDate,
      arrival: arrivalDate,
      leaving: leavingDate,
    },
    person: {
      id: personId,
    } as IPerson,
    order: {
      date: orderDate,
      number: orderNumber,
    },
  };
};
