import React, { useReducer, useEffect } from 'react';
import Header from './component/Header';
import Form from './component/Form';
import Task from './component/Task';
import './css/index.css';

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  editTask: null
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, title: action.payload.title, createdTime: new Date().toISOString() } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, isChecked: !task.isChecked } : task
        )
      };
    case 'SET_EDIT_TASK':
      return {
        ...state,
        editTask: action.payload
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, editTask } = state;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <section className="container">
      <div className='app-wrapper'>
        <Header />
        <Form
          tasks={tasks}
          dispatch={dispatch}
          editTask={editTask}
        />
        <Task
          tasks={tasks}
          dispatch={dispatch}
        />
      </div>
    </section>
  );
};

export default App;
