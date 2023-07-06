import { Request, Response } from "express";

import { db } from "../../init";
import { conclusionsTbl, personsTbl } from "../../../constants";
import { convertITableConclusionToIConclusion } from "../helpers";

const getPersonData = async (id: number) => {
  const data = await db(personsTbl)
    .select(["id", "fullName", "birthDate"])
    .where({ id });

  return data[0];
};

const getBlankConclusion = async (personId: number, res: Response) => {
  const data = await getPersonData(personId);
  return res.json({
    person: {
      ...data,
      id: personId,
    },
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
      return res.json();
    }

    if (isCreateMode) {
      return await getBlankConclusion(personId, res);
    }

    if (!isCreateMode) {
      return await getFilledConclusion(id, personId, res);
    }
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
