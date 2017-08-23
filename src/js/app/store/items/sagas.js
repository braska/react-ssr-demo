import { put, takeEvery, call } from 'redux-saga/effects';
import { LOAD_ITEMS, loadItemsSuccess, loadItemsFail } from './actions';

function* loadItems(api, { meta: { thunk } }) {
  try {
    const { data } = yield call([api.items, 'getAll']);
    yield put(loadItemsSuccess(data, thunk));
  } catch (e) {
    yield put(loadItemsFail(thunk));
  }
}

export default function* watchGetCurrentUser({ api }) {
  yield takeEvery(LOAD_ITEMS, loadItems, api);
}
