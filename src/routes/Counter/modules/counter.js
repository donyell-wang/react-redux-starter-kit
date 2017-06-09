import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export function doubleAsync () {
  return {
    type    : COUNTER_DOUBLE_ASYNC
  }
}

// ------------------------------------
// Epics
// ------------------------------------
const doubleAsyncEpic = (action$, store) =>
  action$.ofType(COUNTER_DOUBLE_ASYNC)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .map(() => increment(store.getState().counter))

export const epics = combineEpics(doubleAsyncEpic)

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
