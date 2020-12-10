import { actionType, asyncActionType } from 'redux/types';
import { getTask, sendTask } from 'api/request';
import { Acts } from 'reducers/task';
import { ITask } from "../types";

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

// const setError: actionType = (error) => ({
//   type: Acts.setError,
//   error,
// });

export const loadTask: asyncActionType = (id: number) => async (dispatch) => {
  dispatch(setIsLoading());

  const task: ITask | null = await getTask(id);

  if (task) {
    dispatch({
      type: Acts.loadTask,
      payload: {
        task,
      },
    });
  }
  dispatch(unsetIsLoading());
};

export const updateTask: asyncActionType = (task: ITask, id: number) => async (dispatch) => {
  dispatch(setIsAdding());
  const method = task ? 'put' : 'post';
  const data = await sendTask(task, method, id);
  if (data) dispatch(setAddingDone());
  dispatch(unsetIsAdding());
};

export const clearState: asyncActionType = () => async (dispatch) => {
  dispatch({
    type: Acts.clearState,
  });
};
