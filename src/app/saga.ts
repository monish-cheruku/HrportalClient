import { all, fork } from "redux-saga/effects";
import { watcherbusinessunit } from "../features/BusinessUnit/businessunitsaga";
import { watchercompany } from "../features/Company/companysaga";
import { watchercustomer } from "../features/Customer/customersaga";
import { watcherexperiencelevel } from "../features/ExperienceLevel/experiencelevelsaga";
import { watcherdesignation } from "../features/Designation/designationsaga";
import { watchersubband } from "../features/SubBand/subbandsaga";
// import { watcherband } from "../features/Band/bandsaga";
import { watcherserviceline } from "../features/ServiceLine/ServiceLineSaga"

import { watcherLocation } from "../features/Location/Locationsaga";

import { watcherBand } from "../features/Band/Bandsaga";

import { watcherManageBill } from "../features/ManageBillRate/ManageBillRatesaga";

import { watcherInsurance } from "../features/ManageInsurance/ManageInsurancesaga"

import { watcherIndustry } from "../features/Industry/Industry.saga";
import { watcheruserroles } from "../features/UserRoles/userrolesaga";
import { watcherLogin } from "../features/Login/Loginsaga";
import { watcherJobPostAction } from "../features/JobPostActions/jobpostactionssaga";
import {watcherpdfdownload} from '../features/Downloadpdfs/downloadsaga'
function* helloSaga() {
  yield console.log("sagas started");
  yield "Hello Sagas";
}

export function* rootSaga() {
  // yield all([helloSaga(), watchercounter(),watcherquote(),watchercompany(),
  // watcherbusinessunit(),watchercustomer(),watcherexperiencelevel(),watcherdesignation(),watchersubband()3]);
  // yield all([helloSaga(), watchercounter(),watcherquote(),watcherbusinessunit()]);
  // yield all([helloSaga(), watchercounter(),watcherquote(),watchercustomer()]);

  yield fork(helloSaga)
  yield fork(watchercompany)
  yield fork(watcherbusinessunit)
  yield fork(watchercustomer)
  yield fork(watcherexperiencelevel)
  yield fork(watcherdesignation)
  // yield fork(watcherband)
  yield fork(watchersubband)
  yield fork(watcherserviceline)
  yield fork(watcherLocation)
  yield fork(watcherBand)
  yield fork(watcherManageBill)
  yield fork(watcherInsurance)
  yield fork(watcherIndustry)
  yield fork(watcherLogin)
  yield fork(watcherJobPostAction)
  yield fork(watcheruserroles)
  yield fork(watcherpdfdownload)
}
