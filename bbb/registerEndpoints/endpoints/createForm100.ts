import { Request, Response } from "express";

import { Forms, IForm100, IPerson, IResponseBriefRecord } from "../../../api";
import { db } from "../../init";
import { personsTbl, forms100Tbl, briefsTbl } from "../../../constants";

import {
  convertIForm100ToTableForm100,
  convertIPersonToTablePerson,
  getPersonRecordsQuantity,
} from "../helpers";

const insertNewForm100ToTable = async (data: Omit<IForm100, "id">) => {
  const convertedData = convertIForm100ToTableForm100(data as IForm100);

  await db(forms100Tbl).insert(convertedData);
};

const updatePersonAfterFormCreating = async (form100: IForm100) => {
  const {
    person,
    accidentTime,
    fullDiagnosis,
    diagnosis,
    id: newForm100Id,
  } = form100;

  const personId = person.id;

  const isNewPerson = personId === -1;

  const { id, ...updatedPerson } = {
    ...convertIPersonToTablePerson(person as IPerson),
    lastForm100Id: newForm100Id,
    updatedAt: accidentTime,
    lastRecordDiagnosis: fullDiagnosis ?? diagnosis,
  };

  if (isNewPerson) {
    await db(personsTbl).insert({ ...updatedPerson, recordsQuantity: 1 });
  }

  if (!isNewPerson) {
    const prevRecordsQuantity = await getPersonRecordsQuantity(personId);

    await db(personsTbl)
      .update({ ...updatedPerson, recordsQuantity: prevRecordsQuantity + 1 })
      .where({ id: personId });
  }
};

const updateForm100PersonId = async (formId: number, personId: number) => {
  await db(forms100Tbl).update({ personId: personId }).where({ id: formId });
};

const updateBriefsTableAfterFormCreating = async (
  formData: Pick<
    IForm100,
    "id" | "accidentTime" | "diagnosis" | "fullDiagnosis"
  >,
  personId: number
) => {
  const { id, accidentTime, fullDiagnosis, diagnosis } = formData;

  await db(briefsTbl).insert({
    type: Forms.FORM_100,
    date: accidentTime,
    fullDiagnosis: fullDiagnosis ?? diagnosis,
    formId: id,
    personId,
  });
};

const updateFormsWithPersonId = async (
  formData: Pick<
    IForm100,
    "id" | "diagnosis" | "fullDiagnosis" | "accidentTime"
  >,
  res: Response
) => {
  const { id: newForm100Id, accidentTime, diagnosis, fullDiagnosis } = formData;

  const newPersonIds = await db(personsTbl)
    .select("id")
    .where({ lastForm100Id: newForm100Id })
    .limit(1);

  const newPersonId = newPersonIds?.[0]?.id;

  if (!newPersonId) {
    return res.end();
  }

  await updateForm100PersonId(newForm100Id, newPersonId);

  await updateBriefsTableAfterFormCreating(
    {
      id: newForm100Id,
      accidentTime,
      diagnosis,
      fullDiagnosis,
    },
    newPersonId
  );
};

export const createForm100 = async (req: Request, res: Response) => {
  const {
    person,
    date,
    accidentTime,
    diagnosis,
    fullDiagnosis,
  }: Omit<IForm100, "id"> = req.body;

  const personId = person.id;
  const isNewPerson = person.id === -1;

  await insertNewForm100ToTable(req.body);

  const formsIds = await db(forms100Tbl)
    .select("id")
    .where({ personId })
    .orderBy("date", "desc")
    .limit(1);

  const newForm100Id = formsIds[0]?.id;

  if (!newForm100Id) {
    return res.end();
  }

  await updatePersonAfterFormCreating({ ...req.body, id: newForm100Id });

  const briefData = {
    id: newForm100Id,
    diagnosis,
    fullDiagnosis,
    accidentTime,
  };

  if (!isNewPerson) {
    await updateBriefsTableAfterFormCreating(briefData, personId);
    return res.end();
  }

  if (isNewPerson) {
    await updateFormsWithPersonId(briefData, res);
  }
  return res.end();
};
