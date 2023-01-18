import { call, put, takeEvery } from "redux-saga/effects"
import { candidateinfo, personaldetails } from "../../api/agent"
import { RootState, store } from "../../app/store"
import { createtoast } from "../ToastSlice"

export const candidateinfodata = (state:RootState) => state.candidateinfo
function* createnewpersonalsagaworker(data) {
    try { 
        // console.log(data.payload)
        var res: Promise<any> = yield call(personaldetails.createpersonaldetails,data.payload)
        // console.log(res)
// yield Candidatedatasagaworker(data.payload={"jobpostID":data.payload.jobpostID})
// yield call({type:"getCandidatefromapi"})
        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)
        store.dispatch(createtoast({

            id:34324,
        
            status:"error",
        
            data:err.data[0][0],                                                       //change this
        
            endpoint:err.config.url.toString()                                        //change this
        
        }))




    }
}
function* updatepersonalsagaworker(data) {
    try { 
        // console.log(data.payload)
        var res: Promise<any> = yield call(personaldetails.updatepersonaldetails,data.payload)
        // console.log(res)


        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)
        store.dispatch(createtoast({

            id:34324,
        
            status:"error",
        
            data:err.data[0][0],                                                       //change this
        
            endpoint:err.config.url.toString()                                        //change this
        
        }))




    }
}
function* Personaldatasagaworker(data) {
    try {
       console.log(data)
        var res: Promise<any> = yield call(personaldetails.getpersonaldetailsdata, data.payload)
        // console.log(res)
        yield put({type:"Personaldetails/Personaldetailsdata",payload:res})
    }
    catch (err) {
        console.log(err)



    }
}
function* candidateinfogetactionsagaworker(data) {
    try {
       
        var res: Promise<any> = yield call(candidateinfo.getcandidateinfo, data.payload)
        // console.log(res)
        yield put({ type: "candidateinfo/Candidateinfodata", payload: res })
        console.log(res["Selected_Candidate_ID"])
        yield put({ type: "Personaldetails/personaldetailsaction", payload: {"selectedcandidateid":res["Selected_Candidate_ID"]} })
        // yield put()
    }
    catch (err) {
        console.log(err)



    }
}













export function* watcherpersonaldetails() {

    yield takeEvery("Personaldetails/createpersonaldetailsaction", createnewpersonalsagaworker)
    yield takeEvery("Personaldetails/updatepersonaldetailsaction", updatepersonalsagaworker)
    yield takeEvery("Personaldetails/personaldetailsaction", Personaldatasagaworker)
    yield takeEvery("candidateinfo/candidateinfogetaction", candidateinfogetactionsagaworker)
    
    
}