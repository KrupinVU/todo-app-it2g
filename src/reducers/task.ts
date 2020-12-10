import {
  setLoading,
  unsetLoading,
  defaultPayload,
  setErrorMessage,
} from 'redux/constants';
import { ITask, IError } from 'types';
import { reducerType } from 'redux/types';

export enum Acts {
  setIsLoading = 'SET_IS_LOADING_TASK',
  unsetIsLoading = 'UNSET_IS_LOADING_TASK',
  setIsAdding = 'SET_IS_ADDING_TASK',
  unsetIsAdding = 'UNSET_IS_ADDING_TASK',
  setAddingDone = 'SET_ADDING_TASK_DONE',
  loadTask = 'LOAD_TASK',
  clearState = 'CLEAR_STATE',
  setError = 'SET_ERROR'
}

export type TaskState = {
  isLoading: boolean;
  isAdding: boolean;
  addingDone: boolean;
  task: ITask | null;
  error: IError | null
};

const initState: TaskState = {
  isLoading: false,
  isAdding: false,
  addingDone: false,
  task: null,
  error: null,
};

const task: reducerType<TaskState> = (
  state = initState,
  { type,
    payload = defaultPayload,
    error = new Error('Неизвестная ошибка') },
) => {
  switch (type) {
    case Acts.setIsLoading:
      return setLoading(state);
    case Acts.unsetIsLoading:
      return unsetLoading(state);
    case Acts.loadTask:
      return ({
        ...state,
        task: payload.task,
      });
    case Acts.setIsAdding:
      return ({
        ...state,
        isAdding: true,
        addingDone: false,
      });
    case Acts.unsetIsAdding:
      return ({
        ...state,
        isAdding: false,
      });
    case Acts.setAddingDone:
      return ({
        ...state,
        isAdding: false,
        addingDone: true,
        error: null,
      });
    case Acts.clearState:
      return ({
        ...state,
        ...initState,
      });
    case Acts.setError:
      return setErrorMessage(state, error);

    default:
      return state;
  }
};

export default task;
