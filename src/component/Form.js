import React, { useEffect, useReducer } from 'react';
import { v4 as uuidV4 } from 'uuid';

const initialState = {
  input: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'RESET_INPUT':
      return { ...state, input: "" };
    default:
      return state;
  }
};

const Form = ({ dispatch, editTask }) => {
  const [state, formDispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    if (editTask) {
      formDispatch({ type: 'SET_INPUT', payload: editTask.title });
    } else {
      formDispatch({ type: 'RESET_INPUT' });
    }
  }, [editTask]);

  const inputChange = (e) => {
    formDispatch({ type: 'SET_INPUT', payload: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!editTask) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: uuidV4(),
          title: state.input,
          isChecked: false,
          createdTime: new Date().toISOString()
        }
      });
      formDispatch({ type: 'RESET_INPUT' });
    } else {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          id: editTask.id,
          title: state.input
        }
      });
    }
  };

  return (
    <form onSubmit={formSubmit} className="input-group">
      <input
        type="text"
        placeholder="Enter task"
        className="task-input"
        value={state.input}
        required
        onChange={inputChange}
      />
      <button
        className='button-add'
        type="submit">{editTask ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default Form;
