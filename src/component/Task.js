import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const Task = ({ tasks, setTasks, setEditTask }) => {
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleCheck = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  const formatTime = (timeString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(timeString).toLocaleString('en-US', options);
  };

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div className={`task-list ${task.isChecked ? 'checked' : ''}`} key={task.id}>
          <div className="task-details">
            <p className="task-name">{task.title}</p>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;