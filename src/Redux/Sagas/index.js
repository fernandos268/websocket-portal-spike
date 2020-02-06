import { fork } from 'redux-saga/effects'

import Auth from './Auth'

export default function* rootSaga() {
    yield [
        fork(Auth)
    ]
}
