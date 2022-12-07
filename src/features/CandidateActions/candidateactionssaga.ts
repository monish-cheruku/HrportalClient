import { call, put, takeEvery } from "redux-saga/effects"
import { candidateactions } from "../../api/agent"
import { store } from "../../app/store"
import { createtoast } from "../ToastSlice"


function* createnewcandidatesagaworker(data) {
    try { 
        console.log("Into")
        console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.createcandidate,data.payload)
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
function* updatecandidatesagaworker(data) {
    try { 
        console.log("Into")
        console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.updatecandidate,data.payload)
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
        console.log(res)
        yield put({ type: "CandidateAction/Candidatedata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}

export function* watcherCandidateAction() {

    yield takeEvery("CandidateAction/createnewcandidate", createnewcandidatesagaworker)
    yield takeEvery("CandidateAction/updatecandidate", updatecandidatesagaworker)
    yield takeEvery("CandidateAction/getCandidatefromapi", Candidatedatasagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}