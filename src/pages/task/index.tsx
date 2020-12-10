import React, {useEffect, memo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {Box, Button, CircularProgress, Paper, Typography} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { stateType } from 'redux/types';
import { TaskState } from 'reducers/task';
import { loadTask, updateTask, clearState } from 'actions/task';
import { removeTask } from 'actions/home';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    minHeight: '320px',
    margin: '0 auto',
    flexWrap: 'wrap',
    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: '10px',
      width: '100%',
      padding: '20px',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: '20px',
    }
  },
  'done-button': {
    backgroundColor: 'green',
    color: '#ffffff',
  },
  'loader-wrapper': {
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    margin: '20px auto',
  },
  'task-label': {
    fontWeight: 700,
    textTransform: 'uppercase',
  }
}));

const TaskPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { task, isLoading } = useSelector(({ task }: stateType<TaskState>) => task);
  const [status, setStatus] = useState(task?.isDone || false);

  const deleteHandler = () => {
    dispatch(removeTask(id));
    history.goBack();
  }

  const handleClickBack = () => {
    dispatch(clearState());
    history.goBack();
  }

  const handleUpdate = () => {
    setStatus(true);
  }

  useEffect(() => {
    if ((!task)) {
      dispatch(loadTask(id))
    };
    if (status) {
      const updatedTask = {
        ...task,
        isDone: true,
      }
      dispatch(updateTask(updatedTask, id));
      dispatch(loadTask(id));
    }
  }, [task, dispatch, id, status]);

  return (
    <Box className={classes.root}>
      <Paper elevation={3}>
        {task ?
          <>
            <Box className={classes.container}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickBack()}
              >
                Назад
              </Button>
              <Button
                variant="contained"
                className={classes['done-button']}
                onClick={() => handleUpdate()}
                disabled={task.isDone}
              >
                Отметить задачу как выполненную
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete/>}
                onClick={() => deleteHandler()}
              >
                Delete
              </Button>
            </Box>
            <Box className={classes.container}>
              <Typography component="p"><span className={classes['task-label']}>Задача: </span>{task.title}</Typography>
            </Box>
            <Box className={classes.container}>
              <Typography component="p"><span className={classes['task-label']}>Статус: </span>{task.isDone ? 'Выполнена' : 'В работе'}</Typography>
            </Box>
            <Box className={classes.container}>
              <Typography component="p"><span className={classes['task-label']}>Описание: </span>{task.details}</Typography>
            </Box>
          </> :
          <Box className={classes['loader-wrapper']}>
            {(!task && isLoading) ?
              <CircularProgress className={classes.loader} color="secondary" /> :
              <Typography component="p">Страница с подробной информацией о задаче не найдена</Typography>
            }
          </Box>
        }
      </Paper>
    </Box>
  );
}

export default memo(TaskPage);