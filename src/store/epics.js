import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'

const epic$ = new BehaviorSubject(combineEpics())
export const rootEpic = (action$, store) =>
  epic$.mergeMap(epic =>
    epic(action$, store)
  )

export const injectEpics = (epic) => {
  epic$.next(epic)
}

export default rootEpic
