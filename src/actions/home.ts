import { actionType, asyncActionType } from 'redux/types';
import {deleteTask, getTasks, sendTask} from 'api/request';
import { Acts } from 'reducers/home';
import {ITask} from "../types";

const setIsLoading: actionType = () => ({
  type: Acts.setIsLoading,
});

const unsetIsLoading: actionType = () => ({
  type: Acts.unsetIsLoading,
});

const setIsAdding: actionType = () => ({
  type: Acts.setIsAdding,
});

const unsetIsAdding: actionType = () => ({
  type: Acts.unsetIsAdding,
});

const setAddingDone: actionType = () => ({
  type: Acts.setAddingDone,
});

const setError: actionType = (error) => ({
  type: Acts.setError,
  error,
});

export const loadTasks: asyncActionType = () => async (dispatch) => {
  dispatch(setIsLoading());
  const data = await getTasks();

  if (!data) {
    dispatch(setError(data));
  } else {
    dispatch({
      type: Acts.getTasksList,
      payload: {
        tasks: data,
      },
    });
  }

  dispatch(unsetIsLoading());
}

export const removeTask: asyncActionType = (id: number) => async (dispatch) => {
  dispatch(setIsAdding());
  const status = await deleteTask(id);
  if (status === 200) dispatch(setAddingDone());
  dispatch(unsetIsAdding());
}

export const addTask: asyncActionType = (title: string, details?: string) => async (dispatch) => {
  dispatch(setIsAdding());
  if (!title) return;
  const task: ITask = {
    title,
    details: details || null,
    isDone: false,
  }

  const data = await sendTask(task);
  if (data) dispatch(setAddingDone());
  dispatch(unsetIsAdding());
}