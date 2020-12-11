import React, { useEffect, useState, memo, ChangeEvent } from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';
import { Container,
  Typography,
  Paper,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from 'redux/types';
import { HomeState } from 'reducers/home';
import { addTask, loadTasks, removeTask } from 'actions/home';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  title: {
    'text-align': 'center',
  },
  loader: {
    margin: '20px auto',
  },
  filters: {
    width: '100%',
    padding: '0 10px',
    marginBottom: '20px',
  }
}));

function HomePage() {
  const classes = useStyle();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [filters, setFilters] = useState({
    doneFilter: true,
    doingFilter: true,
  });
  const { tasks, isLoading, addingDone } = useSelector(({ home }: stateType<HomeState>) => home);
  let filteredTaskList = tasks;
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeTask(id));
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = () => {
    dispatch(addTask(title, details));
  }

  useEffect(() => {
    if (!tasks || addingDone) dispatch(loadTasks());
  }, [tasks, dispatch, addingDone]);

  const { doneFilter, doingFilter} = filters;
  if (tasks) {
    if (doneFilter && !doingFilter) {
      filteredTaskList = tasks.filter((item) => item.isDone === true);
    } else if (!doneFilter && doingFilter) {
      filteredTaskList = tasks.filter((item) => item.isDone === false);
    } else if (!doingFilter && !doneFilter) {
      filteredTaskList = null;
    }
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h3" className={classes.title}>
        Task tracker by KrupinVU
      </Typography>
      {(!tasks && isLoading) ?
        <CircularProgress className={classes.loader} color="secondary" /> :
        <>
          <Paper elevation={3} className={classes.filters}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.doneFilter}
                    onChange={(event) => handleChange(event)}
                    name="doneFilter"
                  />
                }
                label="Показать выполненные"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.doingFilter}
                    onChange={(event) => handleChange(event)}
                    name="doingFilter"
                  />
                }
                label="Показать невыполненные"
              />
            </FormGroup>
          </Paper>
          <TodoList tasks={filteredTaskList} handleDelete={handleDelete}/>
        </>
      }
      <TodoForm
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setDetails={setDetails}
        title={title}
        details={details}
      />
    </Container>
  );
}

export default memo(HomePage);
