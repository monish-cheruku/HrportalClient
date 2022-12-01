import { call, takeEvery } from "redux-saga/effects"
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


export function* watcherCandidateAction() {

    yield takeEvery("CandidateAction/createnewcandidate", createnewcandidatesagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}