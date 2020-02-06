import { call, put, takeLatest, all } from 'redux-saga/effects'
import Cookies from 'universal-cookie';

import Types from '../Types'
const {
    REQUESTED,
    SET_AUTH_TOKEN
} = Types

const cookies = new Cookies()

async function*  SetAuthToken({ payload }) {
    const {
        token
    } = payload
    console.log('SAGA ==> SetAuthToken ==>', payload)
    await cookies.set('emp-pres-access-token', token, { path: '/' })
    yield put({ type: SET_AUTH_TOKEN, payload })
}

export default function* () {
    yield takeLatest(`${SET_AUTH_TOKEN}${REQUESTED}`, SetAuthToken)
}
