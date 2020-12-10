import axios from 'axios';
import { TASKS_URL } from './url';
import { ITask } from 'types';

export const getTasks = async () => axios.get(TASKS_URL, {
  headers: {
    'content-type': 'application/json',
  }
}).then(res => res.data as Promise<ITask[]>);

export const getTask = async (id: number) => axios.get(`${TASKS_URL}${id}/`, {
  headers: {
    'content-type': 'application/json',
  }
}).then(res => res.data as Promise<ITask>);

export const deleteTask = async (id: number) => axios.delete(`${TASKS_URL}${id}/`, {
  headers: {
    'content-type': 'application/json',
  }
}).then(res => res.status);

export const sendTask = async (task: ITask, method: 'post' | 'put' = 'post', id?: number) => {
  const url = id ? `${TASKS_URL}${id}/` : TASKS_URL;
  return axios[method](url,
    {
      ...task,
    },
    {
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.data as Promise<ITask>);
}
