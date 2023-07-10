import { Request, Response } from "express";

import { db } from "../../init";
import { forms100Tbl, personsTbl } from "../../../constants";
import { convertTableForm100ToIForm100 } from "../helpers";
import { IGetFormPayload } from "../../../api";
import { getUser } from "./getUser";

const getPersonData = async (personId: number) => {
  const data = await db(personsTbl)
    .select([
      "fullName",
      "personalId",
      "tokenNumber",
      "rank",
      "gender",
      "militaryBase",
    ])
    .where({ id: personId });
  return data[0];
};

const getBlankForm100 = async (
  personId: number,
  doctorId: number,
  res: Response
) => {
  const data = await getPersonData(personId);
  const {
    fullName: author,
    clinic,
    signature,
    militaryBase,
  } = await getUser(doctorId);
  return res.json({
    person: {
      ...data,
      id: personId,
      militaryBase: data.militaryBase ?? militaryBase,
    },
    author,
    clinic,
    signature,
  });
};

const getFilledForm100 = async (
  id: number,
  personId: number,
  res: Response
) => {
  const forms100Data = await db(forms100Tbl)
    .select("*")
    .where({ id })
    .andWhere({ personId });

  const personData = await getPersonData(personId);

  const convertedData = convertTableForm100ToIForm100({
    ...forms100Data[0],
    person: {
      ...personData,
      id: personId,
    },
  });

  return res.json(convertedData);
};

export const getForm100 = async (req: Request, res: Response) => {
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
      const {
        fullName: author,
        clinic,
        signature,
        militaryBase,
      } = await getUser(doctorId);
      return res.json({ author, clinic, signature, militaryBase });
    }

    if (isCreateMode) {
      return await getBlankForm100(personId, doctorId, res);
    }

    return await getFilledForm100(id, personId, res);
  } catch (error) {
    return console.error(error);
  }
};
