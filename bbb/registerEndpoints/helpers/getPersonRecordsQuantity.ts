import { personsTbl } from "../../../constants";
import { db } from "../../init";

export const getPersonRecordsQuantity = async (id: number) => {
  const data = await db(personsTbl).select("count").where({ id });

  return data[0]?.count ?? 0;
};
