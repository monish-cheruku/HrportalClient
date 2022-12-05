import { put, call, takeEvery } from 'redux-saga/effects'
import { Candidatedata, getCandidatefromapi, createnewjobpost, updateICandidate } from './candidatesslice'
import { candidates } from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store } from "../../app/store"
function* Candidatedatasagaworker(data) {
    try {
        var res: Promise<any> = yield call(candidates.getallcandidatedata, data.payload)
        // console.log(res)
        yield put({ type: "Candidate/Candidatedata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* JobPostcandidatessubmitsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(candidates.candidatessubmit, data.payload)
        // console.log(res)
        // yield put({ type: "JobPostAction/JobPostActiondata", payload: res })

        //toast
    }
    catch (err) {
        console.log(err)



    }
}
// function* usersbyrolessagaworker(data) {
//     try {
//         // console.log(data.payload)
//         var res: Promise<any> = yield call(candidates.usersbyroles, data.payload)
//         // console.log(res)
//         yield put({ type: "usersbyroles/usersbyrolesdata", payload: res })

//         //toast
//     }
//     catch (err) {
//         console.log(err)



//     }
// }
// function* createnewjobpostsagaworker(data) {
//     try {
//         console.log("hit")
//         console.log(data.payload)
//         var res: Promise<any> = yield call(jobpostactions.createjobpost, data.payload)
//         console.log(res)
//         yield put({ type: "JobPostAction/getJobPostActionfromapi", payload: res })

//         //toast
//     }
//     catch (err) {
//         console.log(err)



//     }
// }
// function* createIndustrysagaworker(payload) {
//     try {
//         // var res: Promise<any>=yield call({type:Industryapi.createIndustry,payload:payload})
//         var res: Promise<any> = yield call(Industryapi.createIndustry, payload.payload)
//         console.log(res)
//         // yield put({type:Industriesdata,payload:res})
//         yield Industriesgetsagaworker()
//         yield store.dispatch(createtoast({

//             id: 454,

//             status: "success",

//             data: res.toString(),

//             endpoint: "400"

//         }))
//     }
//     catch (err) {
//         // console.log(err)
//         //var temp:any=Object.values(err.data)[0]
//         //console.log(temp[0])
//         if (err.data != undefined)

//             store.dispatch(createtoast({

//                 id: 34324,

//                 status: "error",

//                 data: err.data[0][0],                                       ///" Industry Name already exists",//

//                 endpoint: err.config.url.toString()

//             }))


//     }
// }
// function* updateIndustrysagaworker(payload) {
//     try {
//         // var res: Promise<any>=yield call({type:Industryapi.createIndustry,payload:payload})
//         var res: Promise<any> = yield call(Industryapi.updateIndustry, payload.payload)
//         // console.log(res)
//         // yield put({type:Industriesdata,payload:res})
//         yield Industriesgetsagaworker()
//         yield store.dispatch(createtoast({

//             id: 987878,

//             status: "success",

//             data: res.toString(),

//             endpoint: "400"

//         }))
//     }
//     catch (err) {
//         console.log(err)
//         if (err.data != undefined)
//             yield store.dispatch(createtoast({
//                 id: 987878,
//                 status: "error",
//                 data: err.data[0][0],
//                 endpoint: err.config.url.toString()
//             }))




//     }
// }



export function* watcherCandidate() {
    yield takeEvery("Candidate/getCandidatefromapi", Candidatedatasagaworker)
    // yield takeEvery("Candidate/ssubmit", JobPostcandidatessubmitsagaworker)
    // yield takeEvery("usersbyroles/usersbyroles", usersbyrolessagaworker)
    // yield takeEvery("JobPostAction/createnewjobpost", createnewjobpostsagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}