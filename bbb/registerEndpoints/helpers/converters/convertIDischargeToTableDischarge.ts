import { IDischarge, ITableDischarge } from "../../../../api";

export const convertIDischargeToTableDischarge = (
  discharge: IDischarge
): ITableDischarge => {
  const { person, datesData, order, ...data } = discharge;
  const {
    sick: sickDate,
    referral: referralDate,
    arrival: arrivalDate,
    leaving: leavingDate,
  } = datesData;

  return {
    ...data,
    personId: person.id,
    sickDate,
    referralDate,
    arrivalDate,
    leavingDate,
    orderDate: order.date,
    orderNumber: order.number,
  };
};
