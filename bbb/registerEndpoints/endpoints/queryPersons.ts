import { Request, Response } from "express";

import { db } from '../../init';
import { personsTbl } from "../../../constants";

import { convertTablePersonToIPerson } from "../helpers";

export const queryPersons = async (_req: Request, res: Response) => {
   try {
    const data = await db(personsTbl);
    
    return res.json({
        entities: data.map(convertTablePersonToIPerson),
        total: data.length
    });
   } catch(message) {
    return console.error(message);
   }
};
