import { createStore, applyMiddleware } from 'redux'

import loggingMiddleware from './middlewares/logging'
import { State, reducer } from './reducer'
import { TypedUseSelectorHook, useSelector as useSelectorGeneric } from 'react-redux'

import { CreateActionType, ValueOf } from './helper/actionTypes'
import * as ActionCreators from './actionCreators'
import * as ActionNames from './actionNames'

export type Action = CreateActionType<typeof ActionCreators, typeof ActionNames> // used to access an specific action's type
export type ActionValues = ValueOf<Action> // used for reducers

export * from './actionCreators'
export * from './reducer'
export * from './selectors'

const rootReducer = reducer

export const useSelector: TypedUseSelectorHook<State> = useSelectorGeneric

const middlewares = [loggingMiddleware]
declare const window: any
//if (window.LogRocket) middlewares.push(window.LogRocket.reduxMiddleware())

/* CREATE STORE */
const store = createStore(rootReducer, applyMiddleware(...middlewares))
export type DispatchFn = typeof store.dispatch
export type GetStateFn = typeof store.getState

export default store
