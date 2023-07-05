import { Request, Response } from "express";

import { db } from "../../init";
import { dischargeUrl, dischargesTbl, personsTbl } from "../../../constants";
import {
  convertITableDischargeToIDischarge,
  convertTableForm100ToIForm100,
  convertTablePersonToIPerson,
} from "../helpers";

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

const getBlankDischarge = async (personId: number, res: Response) => {
  const data = await getPersonData(personId);
  return res.json({
    person: {
      ...convertTablePersonToIPerson(data),
      id: personId,
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
  const { id: stringId, personId: stringPersonId } = req.body as {
    id: string;
    personId: string;
  };

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== undefined;

  const id = +stringId;
  const personId = +stringPersonId;

  try {
    if (!doesPersonExist) {
      return res.json(undefined);
    }

    if (isCreateMode) {
      return await getBlankDischarge(personId, res);
    }

    await getFilledDischarge(id, personId, res);
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
