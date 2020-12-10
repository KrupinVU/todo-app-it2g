import {
  setLoading,
  unsetLoading,
  defaultPayload,
  setErrorMessage,
} from 'redux/constants';
import { ITask, IError } from 'types';
import { reducerType } from 'redux/types';

export enum Acts {
  setIsLoading = 'SET_IS_LOADING_TASKS',
  unsetIsLoading = 'UNSET_IS_LOADING_TASKS',
  setIsAdding = 'SET_IS_ADDING_TASK',
  unsetIsAdding = 'UNSET_IS_ADDING_TASK',
  setAddingDone = 'SET_ADDING_TASK_DONE',
  getTasksList = 'GET_TASKS_LIST',
  setError = 'SET_ERROR'
}

export type HomeState = {
  isLoading: boolean;
  isAdding: boolean;
  addingDone: boolean;
  tasks: ITask[] | null;
  error: IError | null
};

const initState: HomeState = {
  isLoading: false,
  isAdding: false,
  addingDone: false,
  tasks: null,
  error: null,
};

const home: reducerType<HomeState> = (
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
    case Acts.getTasksList:
      return ({
        ...state,
        tasks: payload.tasks,
      });
    case Acts.setError:
      return setErrorMessage(state, error);

    default:
      return state;
  }
};

export default home;
