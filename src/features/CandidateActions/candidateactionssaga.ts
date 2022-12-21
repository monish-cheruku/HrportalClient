import { call, put, takeEvery } from "redux-saga/effects"
import { candidateactions } from "../../api/agent"
import { store } from "../../app/store"
import { createtoast } from "../ToastSlice"


function* createnewcandidatesagaworker(data) {
    try { 
        // console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.createcandidate,data.payload)
        // console.log(res)
// yield Candidatedatasagaworker(data.payload={"jobpostID":data.payload.jobpostID})
// yield call({type:"getCandidatefromapi"})
  yield put({ type: "Candidatesforjobpost/getCandidatefromapi", payload:{"jobpostID":data.payload.get("Job_Post_ID") } })
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
function* updatecandidatesagaworker(data) {
    try { 
        // console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.updatecandidate,data.payload)
        yield put({ type: "Candidatesforjobpost/getCandidatefromapi", payload:{"jobpostID":data.payload.get("Job_Post_ID") } })
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
function* Candidatedatasagaworker(data) {
    try {
       
        var res: Promise<any> = yield call(candidateactions.getallcandidatedata, data.payload)
        // console.log(res)
        yield put({ type: "Candidatesforjobpost/Candidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* candidateactionsdetailsactionsagaworker(data) {
    try { 
      
        var res: Promise<any> = yield call(candidateactions.candidateactiondetails,data.payload)
        // console.log(res)
        // Candidatedatasagaworker(res)
        yield put({ type: "Candidateactiondetails/Candidates", payload: res })

        //toast
    }
    catch (err) {
        console.log(err)



    }
}
function* getcandiatessagaworker(data) {
    try { 
      
        var res: Promise<any> = yield call(candidateactions.candidateactiondetails,data.payload)
        // console.log(res)
        yield put({ type: "Candidates/Candidates", payload: res })

        //toast
    }
    catch (err) {
        console.log(err)



    }
}


export function* watcherCandidateAction() {

    yield takeEvery("Candidatesforjobpost/createnewcandidate", createnewcandidatesagaworker)
    yield takeEvery("Candidatesforjobpost/updatecandidate", updatecandidatesagaworker)
    yield takeEvery("Candidatesforjobpost/getCandidatefromapi", Candidatedatasagaworker)
    
    yield takeEvery("Candidateactiondetails/candidateactiondetails", getcandiatessagaworker)
    yield takeEvery("Candidateactiondetails/candidateactionsdetailsaction",candidateactionsdetailsactionsagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}