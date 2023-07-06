import { Request, Response } from "express";

import { db } from "../../init";
import { personsTbl, referralsTbl } from "../../../constants";
import { convertITableReferralToIReferral } from "../helpers";

const getPersonData = async (id: number) => {
  const data = await db(personsTbl).select(["fullName", "id"]).where({ id });
  return data[0];
};

const getBlankReferral = async (personId: number, res: Response) => {
  const data = await getPersonData(personId);
  return res.json({
    patient: data.fullName,
    personId: data.id,
  });
};

const getFilledReferral = async (
  id: number,
  personId: number,
  res: Response
) => {
  const formData = await db(referralsTbl)
    .select("*")
    .where({ id })
    .andWhere({ personId });

    const all = await db(referralsTbl);

  return res.json(convertITableReferralToIReferral(formData[0]));
};

export const getReferral = async (req: Request, res: Response) => {
  const { id: stringId, personId: stringPersonId } = req.body;

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== "create";

  const id = +stringId;
  const personId = +stringPersonId;

  try {
    if (!doesPersonExist) {
      return res.json(undefined);
    }

    if (isCreateMode) {
      return await getBlankReferral(personId, res);
    }

    return await getFilledReferral(id, personId, res);
  } catch (error) {
    console.error(error);
  }
};
