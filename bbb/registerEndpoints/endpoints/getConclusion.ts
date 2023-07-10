import { Request, Response } from "express";

import { db } from "../../init";
import { conclusionsTbl, personsTbl } from "../../../constants";
import { IGetFormPayload, IUser } from "../../../api";

import { convertITableConclusionToIConclusion } from "../helpers";
import { getUser } from "./getUser";
import { convertUserDataToConclusionDoctorData } from "../helpers/converters/convertUserDataToConclusionDoctorData";

const getPersonData = async (id: number) => {
  const data = await db(personsTbl)
    .select(["id", "fullName", "birthDate"])
    .where({ id });

  return data[0];
};

const getBlankConclusion = async (
  personId: number,
  doctorId: number,
  res: Response
) => {
  const personData = await getPersonData(personId);

  const doctorData = await getUser(doctorId);

  return res.json({
    person: {
      ...personData,
      id: personId,
    },
    ...convertUserDataToConclusionDoctorData(doctorData)
  });
};

const getFilledConclusion = async (
  id: number,
  personId: number,
  res: Response
) => {
  const formData = await db(conclusionsTbl)
    .select("*")
    .where({ id })
    .andWhere({ personId });

  const personData = await getPersonData(personId);

  const convertedData = {
    ...convertITableConclusionToIConclusion(formData[0]),
    person: {
      ...personData,
      id: personId,
    },
  };

  return res.json(convertedData);
};

export const getConclusion = async (req: Request, res: Response) => {
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
      const doctorData = await getUser(doctorId);
      return res.json(convertUserDataToConclusionDoctorData(doctorData));
    }

    if (isCreateMode) {
      return await getBlankConclusion(personId, doctorId, res);
    }

    if (!isCreateMode) {
      return await getFilledConclusion(id, personId, res);
    }
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
