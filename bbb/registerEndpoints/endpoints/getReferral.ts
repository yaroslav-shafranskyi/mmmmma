import { Request, Response } from "express";

import { db } from "../../init";
import { personsTbl, referralsTbl } from "../../../constants";
import { IGetFormPayload } from "../../../api";

import { convertITableReferralToIReferral } from "../helpers";

import { getUser } from "./getUser";

const getPersonData = async (id: number) => {
  const data = await db(personsTbl).select(["fullName", "id"]).where({ id });
  return data[0];
};

const getBlankReferral = async (
  personId: number,
  doctorId: number,
  res: Response
) => {
  const data = await getPersonData(personId);
  const { militaryBase, fullName, position, rank } = await getUser(doctorId);
  return res.json({
    patient: data.fullName,
    personId: data.id,
    militaryBase,
    medicalCommander: {
      fullName,
      position,
    },
    rank,
    doctorId,
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

  return res.json(convertITableReferralToIReferral(formData[0]));
};

export const getReferral = async (req: Request, res: Response) => {
  const {
    id: stringId,
    personId: stringPersonId,
    doctorId: stringDoctorId,
  } = req.body as IGetFormPayload;

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== "create";

  const id = +stringId;
  const personId = +stringPersonId;
  const doctorId = +stringDoctorId;

  try {
    if (!doesPersonExist) {
      const { militaryBase, fullName, position, rank } =
        (await getUser(doctorId)) ?? {};
      return res.json({
        militaryBase,
        medicalCommander: {
          fullName,
          position,
        },
        rank,
        doctorId,
      });
    }

    if (isCreateMode) {
      return await getBlankReferral(personId, doctorId, res);
    }

    return await getFilledReferral(id, personId, res);
  } catch (error) {
    console.error(error);
  }
};
