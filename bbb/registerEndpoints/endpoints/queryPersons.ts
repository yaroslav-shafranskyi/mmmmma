import { Request, Response } from "express";

import { db } from '../../init';

export const queryPersons = (_req: Request, res: Response) => {
    db('_persons').then(persons => res.json(persons)).catch(console.error);
};
