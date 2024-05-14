import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

const Form = ({ input, setInput, tasks, setTasks, editTask, setEditTask }) => {
  const updateTask = (title, id, completed) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, title, completed } : task
    );
    setTasks(newTasks);
    setEditTask(null);
  };

  useEffect(() => {
    setInput(editTask ? editTask.title : "");
  }, [editTask, setInput]);

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!editTask) {
      setTasks([...tasks, { id: uuidV4(), title: input, completed: false, createdTime: new Date().toISOString() }]);
      setInput("");
    } else {
      updateTask(input, editTask.id, editTask.completed);
    }
  };

  return (
    <form onSubmit={formSubmit} className="input-group">
      <input
        type="text"
        placeholder="Enter task"
        className="task-input"
        value={input}
        required
        onChange={inputChange}
      />
      <button className='button-add' type="submit">{editTask ? "Update" : "Add"}</button>
    </form>
  );
};

export default Form;
