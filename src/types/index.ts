export interface IError {
  failed: boolean,
  status: number,
  detail: string,
  text: string,
  json?: {
    [n: string]: string;
  } | null;
  data?: null;
}

export interface ITask {
  id?: number;
  title: string;
  details: string | null;
  isDone: boolean;
}