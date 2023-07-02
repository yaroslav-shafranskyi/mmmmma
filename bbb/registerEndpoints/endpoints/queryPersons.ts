import { Request, Response } from "express";

import { db } from '../../init';

import { convertTablePersonToIPerson } from "../helpers";

export const queryPersons = async (_req: Request, res: Response) => {
   try {
    const data = await db('_persons');
    
    return res.json({
        entities: data.map(convertTablePersonToIPerson),
        total: data.length
    });
   } catch(message) {
    return console.error(message);
   }
};
