import { Request, Response } from "express";

import { db } from "../../init";
import { forms100Tbl, personsTbl } from "../../../constants";
import {
  convertTableForm100ToIForm100,
  convertTablePersonToIPerson,
} from "../helpers";

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

const getBlankForm100 = async (personId: number, res: Response) => {
  const data = await getPersonData(personId);
  return res.json({
    person: {
      ...data,
      id: personId,
    },
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
  const { id: stringId, personId: stringPersonId } = req.body;

  const isCreateMode = stringId === undefined || stringId === "create";
  const doesPersonExist =
    stringPersonId !== undefined && stringPersonId !== "create";

  const id = +stringId;
  const personId = +stringPersonId;

  try {
    const allForms100 = await db(forms100Tbl);
    console.log({ allForms100 })
    if (!doesPersonExist) {
      return res.json(undefined);
    }

    if (isCreateMode) {
      return await getBlankForm100(personId, res);
    }

    return await getFilledForm100(id, personId, res);
  } catch (error) {
    return console.error(error);
  }
};
