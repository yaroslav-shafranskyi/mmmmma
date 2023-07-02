import { Request, Response } from "express";

import { db } from '../../init';
import { IPerson } from "../../../api";

const convertTablePersonToIPerson = (tablePerson: Record<string, unknown>): IPerson => {
    const { oblast, region, settlement, street, building, appartments, updatedAt, ...restFields } = tablePerson;
    
    return {
        ...restFields as unknown as IPerson,
        address: {
            oblast: oblast as string,
            region: region as string,
            settlement: settlement as string,
            building: building as string,
            street: street as string,
            appartments: appartments as string
        }
    }
}

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
