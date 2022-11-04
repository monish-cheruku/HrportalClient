import {put,call,takeEvery} from 'redux-saga/effects'
import { experiencelevelsdata,getexperiencelevelsaction,createexperiencelevelaction,updateexperiencelevelaction} from './experiencelevelslice'
import {quotes,Experienceapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* experiencelevelsgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Experienceapi.getallexperiencelevelsdata)
        console.log(res)
        yield put({type:experiencelevelsdata,payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createexperiencelevelsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:businessunitapi.createbusinessunit,payload:payload})
        var res: Promise<any>=yield call(Experienceapi.createexperiencelevel,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield experiencelevelsgetsagaworker()
        yield store.dispatch(createtoast({

            id:454,

            status:"success",

            data:"Added succesfully",

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)

store.dispatch(createtoast({

    id:34324,

    status:"error",

    data:" Company Name already exists",

    endpoint:"400"

}))


    }
}
function* updateexperiencelevelsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:businessunitapi.createbusinessunit,payload:payload})
        var res: Promise<any>=yield call(Experienceapi.updateexperiencelevel,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield experiencelevelsgetsagaworker()
        yield store.dispatch(createtoast({

            id:987878,

            status:"success",

            data:"updated succesfully",

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)
yield store.dispatch(createtoast({
    id:987878,
    status:"error",
    data:"failed to update",
    endpoint:"400"
}))



    }
}



export function* watcherexperiencelevel(){
    yield takeEvery("experiencelevel/getexperiencelevelsaction",experiencelevelsgetsagaworker)
    yield takeEvery("experiencelevel/createexperiencelevelaction",createexperiencelevelsagaworker)
    yield takeEvery("experiencelevel/updateexperiencelevelaction",updateexperiencelevelsagaworker)
   }