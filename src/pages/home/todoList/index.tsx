import React from 'react';
import TodoItem from './todoItem';
import { ITask } from 'types';
import { Box, makeStyles } from '@material-ui/core';

type PropTypes = {
  tasks: ITask[] | null;
  handleDelete: (id: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
  },
  message: {
    color: '#ffffff',
    margin: '10px 0',
  }
}));

const TodoList = ({tasks, handleDelete}: PropTypes ) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {tasks ?
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id || null}
            handleDelete={handleDelete}
            title={task.title}
            isDone={task.isDone}
          />
        )) :
        <p className={classes.message}>В базе данных не найдено ни одной задачи по вашему запросу.</p>
      }
    </Box>
  );
}

export default TodoList;
