import { Action, AnyAction } from 'redux';
import { createAction, ThunkDispatch } from '@reduxjs/toolkit';

export type Reducer<S, A extends AnyAction> = (state: S, action: A) => S;

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action, // known types of actions that can be dispatched
> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

createAction('GET_PROFILE_DATA', withPayloadType<string>());
