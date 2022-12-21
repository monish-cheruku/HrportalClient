import {put,call,takeEvery} from 'redux-saga/effects'
import {feedbackapis, } from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* feedbackfieldactionsagaworker(data){
    try{
        var res: Promise<any>=yield call(feedbackapis.getfeedbackfields,data.payload)
        // console.log(res)
        
        yield put({type:"feedbackfield/feedbackfielddata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* prevfeedbacksactionsagaworker(data){
    try{
        var res: Promise<any>=yield call(feedbackapis.getprevfeedbacks,data.payload)
        // console.log(res)
        
        yield put({type:"prevfeedback/prevfeedbackdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* sendfeedbackactionsagaworker(data){
    try{
        console.log("sending feed back saga called")
        var res: Promise<any>=yield call(feedbackapis.sendfeedback,data.payload)
        // console.log(res)
        
    }
    catch(err){
console.log(err)



    }
}

export function* watcherfeedback(){
    yield takeEvery("feedbackfield/feedbackfieldaction",feedbackfieldactionsagaworker)
    yield takeEvery("prevfeedback/prevfeedbacksaction",prevfeedbacksactionsagaworker)
    yield takeEvery("feedbackfield/sendfeedbackaction",sendfeedbackactionsagaworker)
   }