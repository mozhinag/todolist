import React, { useState, useEffect } from 'react';
import Todocard from './Todocard';

const Todo = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const [filterOption, setFilterOption] = useState('All');

  useEffect(() => {
    // Load todos from local storage when the component mounts
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      taskName,
      description,
      status,
    };

    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setEditingTodo(index);
  };

  const updateTodo = (index, updatedTodo) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const updateTodoStatus = (index, newStatus) => {
    const updateTodos = [...todos];
    updateTodos[index].status = newStatus;
    setTodos(updateTodos);
  };

  const filterTodos = () => {
    if (filterOption === 'All') {
      return todos;
    } else {
      return todos.filter((todo) => todo.status === filterOption);
    }
  };

  return (
    <>
      <div className="col">
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Task Name"
          aria-label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="col">
        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 ">
            <h4>My todos</h4>
          </div>
          <div className="col md-6">
            <div className="d-flex justify-content-end">
              <h4 htmlFor="status">Status : </h4>
              <select
                aria-label="Default select example"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {filterTodos().map((todo, index) => (
          <Todocard
            key={index}
            index={index}
            todo={todo}
            onDelete={() => deleteTodo(index)}
            onUpdateStatus={(newStatus) => updateTodoStatus(index, newStatus)}
            onEdit={() => editTodo(index)}
            onUpdate={(updatedTodo) => updateTodo(index, updatedTodo)}
          />
        ))}
      </div>
    </>
  );
};

export default Todo;
