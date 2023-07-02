import { Request, Response } from "express";

import { db } from '../../init';

import { convertTablePersonToIPerson } from "../helpers";

export const getPerson = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const data = await db('_persons')
            .select('*')
            .where({ id })
        
        return res.json(convertTablePersonToIPerson(data[0]));
    } catch(message) {
        return console.error(message);
    }
};
