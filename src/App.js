import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Form from './component/Form';
import Task from './component/Task';
import './css/index.css';

const App = () => {
  // Initializing the tasks from localStorage or as an empty array
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(initialState);
  const [editTask, setEditTask] = useState(null);

  // Effect hook to update localStorage whenever tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <section className="container">
      <div className='app-wrapper'>
        <Header />
        <Form
          input={input}
          setInput={setInput}
          tasks={tasks}
          setTasks={setTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />
        <Task
          tasks={tasks}
          setTasks={setTasks}
          setEditTask={setEditTask}
        />
      </div>
    </section>
  );
};

export default App;
