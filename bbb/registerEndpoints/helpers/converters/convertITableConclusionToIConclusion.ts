import {
  ConclusionPersonDataType,
  IConclusion,
  ITableConclusion,
} from "../../../../api";

export const convertITableConclusionToIConclusion = ({
  orderDate,
  orderNumber,
  personId,
  ...data
}: ITableConclusion): IConclusion => ({
  ...data,
  person: {
    id: personId,
  } as ConclusionPersonDataType,
  order: {
    date: orderDate,
    number: orderNumber,
  },
});
