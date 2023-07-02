import { createUrl, personsUrl, serviceUrl, updateUrl, getUrl } from "../../constants";

import { app } from '../index';

import { createPerson, getPerson, queryPersons, updatePerson } from "./endpoints";

export const registerEndpoints = () => {
    app.get(`${serviceUrl}${personsUrl}`, queryPersons);
    app.post(`${serviceUrl}${personsUrl}${getUrl}`, getPerson);
    app.post(`${serviceUrl}${personsUrl}${createUrl}`, createPerson);
    app.post(`${serviceUrl}${personsUrl}${updateUrl}`, updatePerson);
};
