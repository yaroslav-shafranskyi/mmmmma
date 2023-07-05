import { Request, Response } from "express";

import { dischargesTbl, personsTbl, briefsTbl } from "../../../constants";
import { Forms, IDischarge, IPerson, ITableDischarge } from "../../../api";
import { db } from "../../init";
import {
  convertIDischargeToTableDischarge,
  convertIPersonToTablePerson,
} from "../helpers";

const updateDischargesTableAfterFormCreating = async (
  data: Omit<IDischarge, "id">
) => {
  await db(dischargesTbl).insert(
    convertIDischargeToTableDischarge(data as IDischarge)
  );
};

const updatePersonAfterFormCreating = async (
  person: IPerson,
  formData: IDischarge
) => {
  const isNewPerson = person.id === -1;

  const allPersonRecords = await db(briefsTbl)
    .where({ personId: person.id })
    .whereNot({ type: Forms.CONCLUSION });

  const { id, ...updatedPerson } = {
    ...convertIPersonToTablePerson(person),
    lastDischargeId: formData.id,
    updatedAt: formData.datesData.sick,
    recordsQuantity: (allPersonRecords ?? []).length + 1,
    lastRecordDiagnosis: formData.fullDiagnosis,
  };

  if (isNewPerson) {
    await db(personsTbl).insert(updatedPerson);
  }

  if (!isNewPerson) {
    await db(personsTbl).update(updatedPerson).where({ id: person.id });
  }
};

const updateBriefsTableAfterFormCreating = async (
  formData: Pick<IDischarge, "id" | "date" | "fullDiagnosis">,
  personId: number
) => {
  const { id, ...restData } = formData;
  await db(briefsTbl).insert({
    ...restData,
    formId: id,
    personId,
    type: Forms.DISCHARGE,
  });
};

const updateDischargeFormWithNewPersonId = async (
  formId: number,
  personId: number
) => {
  await db(dischargesTbl).update({ personId }).where({ id: formId });
};

const updateFormsWithPersonId = async (
  formData: Pick<IDischarge, "id" | "date" | "fullDiagnosis">,
  res: Response
) => {
  const { id: formId, date, fullDiagnosis } = formData;
  const newPersonIds = await db(personsTbl)
    .select("id")
    .where({ lastDischargeId: formId })
    .limit(1);
  const newPersonId = newPersonIds[0]?.id;

  if (!newPersonId) {
    return res.end();
  }

  await updateDischargeFormWithNewPersonId(formId, newPersonId);
  await updateBriefsTableAfterFormCreating(
    { id: formId, fullDiagnosis, date },
    newPersonId
  );
};

export const createDischarge = async (req: Request, res: Response) => {
  const { id, ...data } = req.body as IDischarge;
  const { person, fullDiagnosis, date } = data;

  const isNewPerson = person.id === -1;

  await updateDischargesTableAfterFormCreating(data);

  const newDischargesTable = await db(dischargesTbl)
    .where({ personId: person.id })
    .select("id")
    .orderBy("id", "desc")
    .limit(1);

  const newDischargeId = newDischargesTable[0]?.id;

  if (!newDischargeId) {
    return res.end();
  }

  await updatePersonAfterFormCreating(person, { ...data, id: newDischargeId });

  const briefData = { id: newDischargeId, fullDiagnosis, date };

  if (!isNewPerson) {
    await updateBriefsTableAfterFormCreating(briefData, person.id);
    return res.end();
  }

  if (isNewPerson) {
    await updateFormsWithPersonId(briefData, res);
  }

  try {
  } catch (error) {
    return console.error(error);
  }

  return res.end();
};
