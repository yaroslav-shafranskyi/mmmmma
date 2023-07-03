import { createUrl, personsUrl, serviceUrl, updateUrl, getUrl, form100Url } from "../../constants";

import { app } from '../index';

import {
    createForm100,
    createPerson,
    getForm100,
    getPerson,
    queryPersons,
    updatePerson
} from "./endpoints";

export const registerEndpoints = () => {
    app.get(`${serviceUrl}${personsUrl}`, queryPersons);
    app.post(`${serviceUrl}${personsUrl}${getUrl}`, getPerson);
    app.post(`${serviceUrl}${personsUrl}${createUrl}`, createPerson);
    app.post(`${serviceUrl}${personsUrl}${updateUrl}`, updatePerson);

    app.post(`${serviceUrl}${form100Url}${getUrl}`, getForm100);
    app.post(`${serviceUrl}${form100Url}${createUrl}`, createForm100);
};
