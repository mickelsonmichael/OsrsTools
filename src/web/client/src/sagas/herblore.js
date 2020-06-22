import { put, takeEvery } from "redux-saga/effects";
import { UPDATE_POTIONS, UPDATE_HERBS } from "../actions/herblore";

export default function* herbloreSaga() {
  console.log("getting potions");

  const pots = [
    {
      id: "str",
      name: "Strength",
      herb: "Guam",
      ingredients: ["Newts Eye"],
      level: 1,
    },
  ];
  yield put({ type: UPDATE_POTIONS, potions: pots });

  const herbs = [{ name: "Guam" }];
  yield put({ type: UPDATE_HERBS, herbs });
}

function* onLoadAsync() {
  yield takeEvery([UPDATE_POTIONS, UPDATE_HERBS], herbloreSaga);
}
