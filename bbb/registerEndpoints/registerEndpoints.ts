import {
  createUrl,
  personsUrl,
  serviceUrl,
  updateUrl,
  getUrl,
  form100Url,
  dischargeUrl,
  referralUrl,
  conclusionUrl,
} from "../../constants";

import { app } from "../index";

import {
  createForm100,
  createPerson,
  getForm100,
  getPerson,
  queryPersons,
  updatePerson,
  updateForm100,
  createDischarge,
  getDischarge,
  createReferral,
  getReferral,
  getConclusion,
  createConclusion,
} from "./endpoints";

export const registerEndpoints = () => {
  app.post(`${serviceUrl}${personsUrl}`, queryPersons);
  app.post(`${serviceUrl}${personsUrl}${getUrl}`, getPerson);
  app.post(`${serviceUrl}${personsUrl}${createUrl}`, createPerson);
  app.post(`${serviceUrl}${personsUrl}${updateUrl}`, updatePerson);

  app.post(`${serviceUrl}${form100Url}${getUrl}`, getForm100);
  app.post(`${serviceUrl}${form100Url}${createUrl}`, createForm100);
  app.post(`${serviceUrl}${form100Url}${updateUrl}`, updateForm100);

  app.post(`${serviceUrl}${dischargeUrl}${createUrl}`, createDischarge);
  app.post(`${serviceUrl}${dischargeUrl}${getUrl}`, getDischarge);

  app.post(`${serviceUrl}${referralUrl}${createUrl}`, createReferral);
  app.post(`${serviceUrl}${referralUrl}${getUrl}`, getReferral);

  app.post(`${serviceUrl}${conclusionUrl}${getUrl}`, getConclusion);
  app.post(`${serviceUrl}${conclusionUrl}${createUrl}`, createConclusion);
};
