import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Paper, Box, Button, Typography } from '@material-ui/core';
import { green, pink, yellow } from '@material-ui/core/colors';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

type PropTypes = {
  title: string;
  isDone: boolean;
  handleDelete: (id: number) => void;
  id: number | null;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    '& > *': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 0',
      width: '100%',
      padding: '10px',
    },
  },
  status: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    border: `7px solid ${yellow[500]}`,
    'border-radius': '50%'
  },
  'status--done': {
    'border-color': green[500],
  },
  title: {
    'margin-left': '30px',
    'font-weight': '500',
    color: '#111111',
    '&:hover': {
      color: pink['A400'],
    },
  }
}));

function TodoItem({title, isDone, handleDelete, id}: PropTypes) {
  const classes = useStyles();
  const deleteHandler = () => {
    if (!id) return;
    handleDelete(id);
  }
  return (
    <Box className={classes.root}>
      <Paper elevation={3}>
        <Typography
          className={isDone ? classNames(classes.status, classes['status--done']) : classes.status}
          component="span"
        />
        <Typography className={classes.title}>
          <NavLink to={`/task/${id}`}>
            {title.toUpperCase()}
          </NavLink>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={() => deleteHandler()}
        >
          Delete
        </Button>
      </Paper>
    </Box>
  );
}

export default memo(TodoItem);
