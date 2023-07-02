import { createUrl, personsUrl, serviceUrl } from "../../constants/urls";

import { app } from '../index';

import { createPerson, queryPersons } from "./endpoints";

export const registerEndpoints = () => {
    app.get(`${serviceUrl}${personsUrl}`, queryPersons);
    app.post(`${serviceUrl}${personsUrl}${createUrl}`, createPerson);
};
