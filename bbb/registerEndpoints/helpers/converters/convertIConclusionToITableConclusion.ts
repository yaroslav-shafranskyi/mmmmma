import { IConclusion, ITableConclusion } from "../../../../api";

export const convertIConclusionToITableConclusion = (
  conclusion: IConclusion
): ITableConclusion => {
  const { person, order, ...data } = conclusion;

  return {
    ...data,
    personId: person.id,
    orderDate: order.date,
    orderNumber: order.number,
  };
};
