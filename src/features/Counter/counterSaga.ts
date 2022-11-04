import { useDispatch } from "react-redux";
import { put,call, takeEvery } from "redux-saga/effects";
import {increment,decrement} from "./countersclice"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* incrementAsyncsaga() {
  yield delay(1000);
  yield put({type:increment})
}
function* decrementsagaworker() {
  yield delay(1000);
  yield put({type:decrement})
}   

export function* watchercounter() {
  yield takeEvery("counter/incrementaction", incrementAsyncsaga);
  yield takeEvery("counter/decrementaction", decrementsagaworker);
}
