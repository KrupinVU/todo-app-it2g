import { Dispatch } from 'redux';
import { IError } from 'types';

export type stateType<T> = {
  [n: string]: T;
};

export type actionReturns = {
  type: string;
  payload?: {
    [n: string]: any;
  };
  error?: IError;
};

export type actionType = (...params: any[]) => actionReturns;

export type asyncActionType = (...params: any[]) => (dispatch: Dispatch<any>) => Promise<void>;

export type reducerType<T> = (state: T, action: actionReturns) => T;
//
// export type DataPropTypes = {
//   [n: string]: string | number | boolean | undefined;
// };
