import {put,call,takeEvery} from 'redux-saga/effects'
import {getquoteaction,getquote} from "./quoteslice"
import {quotes} from "../../api/agent"
function* getquoteactionfun(payload:any){

    // console.log(payload)
    try{

        var res: Promise<any>=yield call(quotes.getdataof,payload.payload)
        yield put({type:getquote,payload:res})
        console.log(res)
    }
    catch(err){
console.log(err)



    }
    // yield put(getquote(res))
}



export function* watcherquote(){
    yield takeEvery("quote/getquoteaction",getquoteactionfun)
    yield takeEvery("getquoteaction",getquoteactionfun)
}