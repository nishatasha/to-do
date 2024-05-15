// Task.js
import React, { useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const initialState = {
  editingTaskId: null,
  editedTaskName: '',
  originalTaskName: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_EDITING':
      return {
        ...state,
        editingTaskId: action.payload.taskId,
        editedTaskName: action.payload.taskName,
        originalTaskName: action.payload.taskName
      };
    case 'CANCEL_EDITING':
      return {
        ...state,
        editingTaskId: null,
        editedTaskName: '',
        originalTaskName: ''
      };
    case 'UPDATE_EDITED_TASK_NAME':
      return {
        ...state,
        editedTaskName: action.payload
      };
    default:
      return state;
  }
};

const Task = ({ tasks, dispatch }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const handleEdit = (task) => {
    localDispatch({
      type: 'START_EDITING',
      payload: {
        taskId: task.id,
        taskName: task.title
      }
    });
  };

  const handleCheck = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const handleSaveEdit = () => {
    dispatch({
      type: 'UPDATE_TASK', payload: {
        id: state.editingTaskId,
        title: state.editedTaskName
      }
    });
    localDispatch({ type: 'CANCEL_EDITING' });
  };

  const formatTime = (timeString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(timeString).toLocaleString('en-US', options);
  };

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div className={`task-list ${task.isChecked ? 'checked' : ''}`} key={task.id}>
          <div className="task-details">
            {state.editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={state.editedTaskName}
                  onChange={(e) => localDispatch({
                    type: 'UPDATE_EDITED_TASK_NAME',
                    payload: e.target.value
                  })}
                  autoFocus
                />
                <button onClick={handleSaveEdit}
                  className='save'>
                  Save
                </button>
                <button
                  onClick={() => localDispatch({ type: 'CANCEL_EDITING' })}
                  className='cancel'>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="task-name" onClick={() => handleEdit(task)}>
                  {task.title}
                </p>
                <div className="task-info">
                  <p className="task-timing">{formatTime(task.createdTime)}</p>
                  <div className="task-buttons">
                    <button className='check task-button' onClick={() => handleCheck(task.id)}>
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className={`fa-square-check ${task.isChecked ? 'checked' : ''}`}
                      />
                    </button>
                    <button className='edit task-button' onClick={() => handleEdit(task)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className='delete task-button' onClick={() => handleDelete(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
