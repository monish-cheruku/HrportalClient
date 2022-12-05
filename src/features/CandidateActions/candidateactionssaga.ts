import { call, put, takeEvery } from "redux-saga/effects"
import { candidateactions } from "../../api/agent"


function* createnewcandidatesagaworker(data) {
    try { 
        console.log("Into")
        console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.createcandidate,data.payload)
        console.log(res)


        //toast
    }
    catch (err) {
        console.log(err)



    }
}
function* Candidatedatasagaworker(data) {
    try {
        console.log("working")
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
    yield takeEvery("CandidateAction/getCandidatefromapi", Candidatedatasagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}