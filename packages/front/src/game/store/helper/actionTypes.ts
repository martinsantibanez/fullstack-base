import { Action } from 'redux'

/**
 * Get all the action types
 * reference: https://warhol.io/blog/reducing-redux-boilerplate-in-typescript (adapted)
 * @param ActionCreators set of actionCreator functions (typeof import('./actions'))
 * @param ActionNames set of action name constants (typeof import('./types'))
 */
export type CreateActionType<ActionCreators extends object, ActionNames extends object> = {
  [Name in keyof ActionCreators]: ActionCreators[Name] extends (
    ...args: any[]
  ) => {
    type: ActionNames[keyof ActionNames]
    payload?: any
  }
    ? ReturnType<ActionCreators[Name]>
    : never
}

export type ValueOf<T> = T[keyof T]