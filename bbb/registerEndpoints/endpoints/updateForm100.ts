import { Request, Response } from "express";

import { IForm100 } from "../../../api";
import { db } from "../../init";
import { briefsTbl, forms100Tbl } from "../../../constants";

import { convertIForm100ToTableForm100 } from "../helpers";

export const updateForm100 = async (req: Request, res: Response) => {
  const data: IForm100 = req.body;
  try {
    await db(forms100Tbl)
      .update(convertIForm100ToTableForm100(data))
      .where({ id: data.id });
    
    await db(briefsTbl)
        .update({ fullDiagnosis: data.fullDiagnosis })
        .where({ formId: data.id })
        
  } catch (message) {
    return console.error(message);
  }

  return res.end();
};
