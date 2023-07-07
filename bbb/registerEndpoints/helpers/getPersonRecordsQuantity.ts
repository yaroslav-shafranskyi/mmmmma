import { personsTbl } from "../../../constants";
import { db } from "../../init";

export const getPersonRecordsQuantity = async (id: number) => {
  const data = await db(personsTbl).select("recordsQuantity").where({ id });

  return data[0]?.recordsQuantity ?? 0;
};
