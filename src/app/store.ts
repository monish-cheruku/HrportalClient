import { applyMiddleware, configureStore,combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import { rootSaga } from './saga'
import companyReducer from '../features/Company/companyslice'
import businessunitReducer from '../features/BusinessUnit/businessunitslice'
import customerReducer from '../features/Customer/customerslice'
import experiencelevelReducer from '../features/ExperienceLevel/experiencelevelslice'
import designationReducer from '../features/Designation/designationslice';
import subbandReducer from '../features/SubBand/subbandslice';
import toastReducer from '../features/ToastSlice'
import servicelineReducer from '../features/ServiceLine/ServiceLineSlice';
import LocationReducer from '../features/Location/Locationslice'
import BandReducer from '../features/Band/Bandslice'
import ManageBillReducer from '../features/ManageBillRate/ManageBillRateslice'
import InsuranceReducer from '../features/ManageInsurance/ManageInsuranceslice'
import IndustryReducer from '../features/Industry/Industryslice'
// import bandReducer from '../features/Band/bandslice';
import UserRolesReducer from '../features/UserRoles/userroleslice';
import userroleoptions from '../features/UserRoles/userroleoptionsslice';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginReducer from '../features/Login/Loginslice';
import jobpostactionsReducer from '../features/JobPostActions/jobpostactionsslice';
import usersbyrolesReducer from '../features/JobPostActions/usersbyrolesslice'
import {persistStore,persistReducer} from 'redux-persist'
import storage  from 'redux-persist/lib/storage'
import rolesoptions from '../features/UserRoles/rolesoptionsslice';
import myjobpostsReducer from '../features/JobPostActions/myjobpostsslice'
import CandidatesforjobpostReducer from '../features/CandidateActions/candidateactionsslice';
import CandidateactiondetailsReducer from '../features/CandidateActions/candidateactiondetailsslice';
import qualificationReducer from '../features/Dropdownoptions/qualificationtypeslice';
import employementtypeReducer from '../features/Dropdownoptions/employementtypeslice';
import feedbackfieldsReducer from '../features/CandidateActions/feedbackfieldsslice';
import  prevfeedbackReducer from "../features/CandidateActions/prevfeedbacks"
import  globalReducer from "../features/Misc/globalslice" 
import  selectedcandidatesReducer from "../features/CandidateActions/selectedcandidatesslice" 
import PersonaldetailsReducer from "../features/Candidate info/personaldetailsslice"
import candidateinfoReducer from "../features/Candidate info/candidateinfoslice"
// export function useReduxStore() {
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

// const enhancers = applyMiddleware(logger, sagaMiddleware);
// }
const persistconfig={
  key:"key",
  storage
}

const rootreducer = combineReducers({
 
  company: companyReducer,
  businessunit: businessunitReducer,
  customer: customerReducer,
  experiencelevel: experiencelevelReducer,
  designation: designationReducer,
  subband: subbandReducer,
  toaster: toastReducer,
  serviceline: servicelineReducer,
  Location: LocationReducer,
  Band: BandReducer,
  ManageBill: ManageBillReducer,
  Insurance: InsuranceReducer,
  Industry: IndustryReducer,
  userroles: UserRolesReducer,
  userroleoptions: userroleoptions,
  myjobposts:myjobpostsReducer,
  Candidatesforjobpost:CandidatesforjobpostReducer,
Login:LoginReducer,
JobPostAction:jobpostactionsReducer,
rolesoptions:rolesoptions,
usersbyroles:usersbyrolesReducer,
Candidateactions:CandidateactiondetailsReducer,
Selectedcandidates:selectedcandidatesReducer,
qualification:qualificationReducer,
employementtype:employementtypeReducer,
feedbackfields:feedbackfieldsReducer,
prevfeedback:prevfeedbackReducer,
global:globalReducer,
CandidatePersonaldetails:PersonaldetailsReducer,
candidateinfo:candidateinfoReducer

// CandidateAction :CandidateActionReducer,

  // band: bandReducer,

})
const persistedReducer=persistReducer(persistconfig,rootreducer)
// const middlewares = [sagaMiddleware]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const enhancers = [middlewareEnhancer]
// const composedEnhancers = composeWithDevTools(...enhancers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  // enhancers: [composedEnhancers]
})

export const persistor=persistStore(store)
sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// export type RootReducer=ReturnType<typeof rootreducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// function createLogger() {
//   throw new Error('Function not implemented.');
// }
