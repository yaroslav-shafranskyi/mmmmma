import { Request, Response } from "express";

import { db } from "../../init";
import { dischargesTbl, personsTbl } from "../../../constants";
import { IGetFormPayload, IUserBrief } from "../../../api";

import {
  convertITableDischargeToIDischarge,
  convertTablePersonToIPerson,
} from "../helpers";

import { getUser } from "./getUser";

const getPersonData = async (personId: number) => {
  const data = await db(personsTbl)
    .select([
      "fullName",
      "birthDate",
      "oblast",
      "region",
      "settlement",
      "street",
      "building",
      "appartments",
      "profession",
    ])
    .where({ id: personId });
  return data[0];
};

const getBlankDischarge = async (
  personId: number,
  doctorId: number,
  res: Response
) => {
  const data = await getPersonData(personId);
  const { fullName: doctor } = (await getUser(doctorId)) as IUserBrief;
  return res.json({
    person: {
      ...convertTablePersonToIPerson(data),
      id: personId,
      doctor,
    },
  });
};

const getFilledDischarge = async (
  id: number,
  personId: number,
  res: Response
) => {
  const dischargeData = await db(dischargesTbl)
    .select("*")
    .where({ id })
    .andWhere({ personId });

  const personData = await getPersonData(personId);

  const convertedData = {
    ...convertITableDischargeToIDischarge(dischargeData[0]),
    person: {
      ...convertTablePersonToIPerson(personData),
      id: personId,
    },
  };

  return res.json(convertedData);
};

export const getDischarge = async (req: Request, res: Response) => {
  const {
    id: stringId,
    personId: stringPersonId,
    doctorId: stringDoctorId,
  } = req.body as IGetFormPayload;

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== undefined;

  const id = +stringId;
  const personId = +stringPersonId;
  const doctorId = +stringDoctorId;

  try {
    if (!doesPersonExist) {
      const { fullName: doctor } = await getUser(doctorId) as IUserBrief;
      return res.json({ doctor });
    }

    if (isCreateMode) {
      return await getBlankDischarge(personId, doctorId, res);
    }

    await getFilledDischarge(id, personId, res);
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
