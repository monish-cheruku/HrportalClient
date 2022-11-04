import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import {rootSaga} from './saga'
import counterReducer from '../features/Counter/countersclice'
import quoteReducer from '../features/Quotes/quoteslice'
import  companyReducer from '../features/Company/companyslice'
import businessunitReducer from '../features/BusinessUnit/businessunitslice'
import customerReducer from '../features/Customer/customerslice'
import experiencelevelReducer from '../features/ExperienceLevel/experiencelevelslice'
import designationReducer  from '../features/Designation/designationslice';
import subbandReducer from '../features/SubBand/subbandslice';
import toastReducer from '../features/ToastSlice'
import  servicelineReducer from '../features/ServiceLine/ServiceLineSlice';
import LocationReducer from '../features/Location/Locationslice'
import BandReducer from '../features/Band/Bandslice'
import ManageBillReducer from '../features/ManageBillRate/ManageBillRateslice'
import InsuranceReducer from '../features/ManageInsurance/ManageInsuranceslice'
import IndustryReducer from '../features/Industry/Industryslice'
// import bandReducer from '../features/Band/bandslice';



// export function useReduxStore() {
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

// const enhancers = applyMiddleware(logger, sagaMiddleware);
// }

const rootreducer = {
  counter: counterReducer,
  quote: quoteReducer,
  company: companyReducer,
  businessunit: businessunitReducer,
  customer: customerReducer,
  experiencelevel: experiencelevelReducer,
  designation: designationReducer,
  subband: subbandReducer,
 toaster:toastReducer,
 serviceline:servicelineReducer,

  Location:LocationReducer,

  Band:BandReducer,

  ManageBill: ManageBillReducer,

  Insurance: InsuranceReducer,
  Industry: IndustryReducer



  // band: bandReducer,

}
export const store = configureStore({
  reducer: rootreducer,
    middleware: [sagaMiddleware]
  })
  sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// function createLogger() {
//   throw new Error('Function not implemented.');
// }
