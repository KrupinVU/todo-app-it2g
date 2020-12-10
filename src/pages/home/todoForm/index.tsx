import React, { memo, FormEvent } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type PropTypes = {
  handleSubmit: () => void;
  setTitle: (title: string) => void;
  setDetails: (details: string) => void;
  title: string;
  details: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    '& > *': {
      padding: '20px',
      '&:not(:last-child)': {
        'margin-botton': '20px',
      }
    }
  },
  submit: {
    margin: '20px auto 0',
    padding: '10px 20px',
  }
}));

const TodoForm = ({handleSubmit, setTitle, setDetails, title, details}: PropTypes) => {
  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    handleSubmit();
    setTitle('');
    setDetails('');
  }
  const classes = useStyles();
  return (
    <form className={classes.form}
      noValidate
      onSubmit={(ev: FormEvent<HTMLFormElement>) => onSubmit(ev)}
    >
      <Paper elevation={3}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          multiline
          fullWidth
          id="title"
          label="Введите заголовок задачи"
          name="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          fullWidth
          name="details"
          label="Описание задачи"
          id="details"
          value={details}
          onChange={(ev) => setDetails(ev.target.value)}
        />
      </Paper>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Добавить задачу
      </Button>
    </form>
  );
}

export default memo(TodoForm);