import { Request, Response } from "express";

import { Forms, IConclusion } from "../../../api";
import { db } from "../../init";
import {
  briefsTbl,
  conclusionsTbl,
  personsTbl,
} from "../../../constants";

import { convertIConclusionToITableConclusion } from "../helpers";

const insertNewConclusionToTable = async (data: Omit<IConclusion, "id">) => {
  await db(conclusionsTbl).insert(
    convertIConclusionToITableConclusion(data as IConclusion)
  );
};

const updatePersonAfterFormCreating = async (
  data: Pick<IConclusion, "id" | "date" | "person" | "diagnosis">
) => {
  const { id: formId, diagnosis, date } = data;

  const { id: personId, ...person } = data.person;
  const isNewPerson = personId === -1;

  const updatedPerson = {
    ...person,
    lastRecordDiagnosis: diagnosis,
    updatedAt: date,
    lastConclusionId: formId,
  };

  if (isNewPerson) {
    await db(personsTbl).insert(updatedPerson);
  }

  if (!isNewPerson) {
    await db(personsTbl).update(updatedPerson).where({ id: personId });
  }
};

const updateBriefsTableAfterFormCreating = async (
  formData: Pick<IConclusion, "id" | "date" | "diagnosis">,
  personId: number
) => {
  const { id, diagnosis, ...restData } = formData;
  await db(briefsTbl).insert({
    ...restData,
    fullDiagnosis: diagnosis,
    formId: id,
    personId,
    type: Forms.CONCLUSION,
  });
};

const updateConclusionWithNewPersonId = async (
  formId: number,
  personId: number
) => {
  await db(conclusionsTbl).update({ personId }).where({ id: formId });
};

const updateFormsWithPersonId = async (
  formData: Pick<IConclusion, "id" | "date" | "diagnosis">,
  res: Response
) => {
  const { id: formId } = formData;

  const newPersonIds = await db(personsTbl)
    .select("id")
    .where({ lastConclusionId: formId })
    .limit(1);

  const newPersonId = newPersonIds[0]?.id;

  if (!newPersonId) {
    return res.end();
  }

  await updateConclusionWithNewPersonId(formId, newPersonId);
  await updateBriefsTableAfterFormCreating(formData, newPersonId);
};

export const createConclusion = async (req: Request, res: Response) => {
  const form = req.body as Omit<IConclusion, "id">;

  const { person, date, diagnosis } = form;

  const personId = person.id;
  const isNewPerson = personId === -1;

  try {
    await insertNewConclusionToTable(form);

    const formsIds = await db(conclusionsTbl)
      .select("id")
      .where({ personId })
      .orderBy("date", "desc")

    const newFormId = formsIds[0]?.id;

    if (!newFormId) {
      return res.end();
    }

    const briefData = { id: newFormId, date, diagnosis };

    await updatePersonAfterFormCreating({ person, ...briefData });

    if (!isNewPerson) {
      await updateBriefsTableAfterFormCreating(briefData, personId);
    }

    if (isNewPerson) {
      await updateFormsWithPersonId(briefData, res);
    }
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
