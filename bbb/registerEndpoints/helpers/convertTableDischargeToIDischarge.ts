import { IDischarge, IPerson, ITableDischarge } from "../../../api";

export const convertTableDischargeToIDischarge = ({
  personId,
  sickDate,
  referralDate,
  arrivalDate,
  leavingDate,
  orderDate,
  orderNumber,
  ...data
}: ITableDischarge): IDischarge => ({
  ...data,
  person: {
    id: personId,
  } as IPerson,
  datesData: {
    sick: sickDate,
    referral: referralDate,
    arrival: arrivalDate,
    leaving: leavingDate,
  },
  order: {
    date: orderDate,
    number: orderNumber,
  },
});
