import { Request, Response } from "express";

import { Forms, IReferral } from "../../../api";
import { db } from "../../init";
import { briefsTbl, personsTbl, referralsTbl } from "../../../constants";

import {
  convertIReferralToITableReferral,
  getPersonRecordsQuantity,
} from "../helpers";

const insertNewReferralToTable = async (data: Omit<IReferral, "id">) => {
  await db(referralsTbl).insert(
    convertIReferralToITableReferral(data as IReferral)
  );
};

const updatePersonAfterFormCreating = async (
  data: Pick<IReferral, "id" | "personId" | "patient" | "diagnosis" | "date">
) => {
  const { id: formId, personId, patient: fullName, diagnosis, date } = data;
  const isNewPerson = personId === -1;

  const updatedPerson = {
    fullName,
    lastRecordDiagnosis: diagnosis,
    updatedAt: date,
    lastReferralId: formId,
  };

  if (isNewPerson) {
    await db(personsTbl).insert({ ...updatedPerson, recordsQuantity: 1 });
  }

  if (!isNewPerson) {
    const prevRecordsQuantity = await getPersonRecordsQuantity(personId);

    await db(personsTbl)
      .update({
        ...updatedPerson,
        recordsQuantity: prevRecordsQuantity + 1,
      })
      .where({ id: personId });
  }
};

const updateBriefsTableAfterFormCreating = async (
  formData: Pick<IReferral, "id" | "date" | "diagnosis">,
  personId: number
) => {
  const { id, diagnosis, ...restData } = formData;
  await db(briefsTbl).insert({
    ...restData,
    fullDiagnosis: diagnosis,
    formId: id,
    personId,
    type: Forms.REFERRAL,
  });
};

const updateReferralFormWithNewPersonId = async (
  formId: number,
  personId: number
) => {
  await db(referralsTbl).update({ personId }).where({ id: formId });
};

const updateFormsWithPersonId = async (
  formData: Pick<IReferral, "id" | "date" | "diagnosis">,
  res: Response
) => {
  const { id: formId } = formData;

  const newPersonIds = await db(personsTbl)
    .select("id")
    .where({ lastReferralId: formId })
    .limit(1);
  const newPersonId = newPersonIds[0]?.id;

  if (!newPersonId) {
    return res.end();
  }

  await updateReferralFormWithNewPersonId(formId, newPersonId);
  await updateBriefsTableAfterFormCreating(formData, newPersonId);
};

export const createReferral = async (req: Request, res: Response) => {
  const form = req.body as Omit<IReferral, "id">;

  const { personId, date, patient, diagnosis } = form;

  const isNewPerson = personId === -1;

  try {
    await insertNewReferralToTable(form);

    const formsIds = await db(referralsTbl)
      .select("id")
      .where({ personId })
      .orderBy("date", "desc")
      .limit(1);
    const newFormId = formsIds[0]?.id;

    if (!newFormId) {
      return res.end();
    }

    const briefData = { id: newFormId, date, diagnosis };

    await updatePersonAfterFormCreating({
      personId,
      patient,
      ...briefData,
    });

    if (!isNewPerson) {
      await updateBriefsTableAfterFormCreating(briefData, personId);
    }

    if (isNewPerson) {
      await updateFormsWithPersonId(briefData, res);
    }
  } catch (error) {
    console.error(error);
  }

  return res.end();
};
