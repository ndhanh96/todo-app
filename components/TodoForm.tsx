import React from 'react';
import { useState, useRef, useEffect } from 'react';

function TodoForm({ todo, deleteTodo, updateTodo }) {
  const [editForm, setEditForm] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todo);
  // const originalTodo = useRef('');

  const handleChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(todo, currentTodo);
    setEditForm(!editForm);
    console.log('submit');
  };

  useEffect(() => {
    setCurrentTodo(todo)
  }, [todo]);

  return (
    <>
      <li>
        <form className='flex justify-center my-1 ' onSubmit={handleSubmit}>
          <input
            disabled={!editForm}
            className='border border-yellow-400 outline-none disabled:bg-blue-300 bg-blue-500 rounded-md'
            value={currentTodo}
            onChange={handleChange}
          />

          <button
            disabled={editForm}
            type='button'
            className='p-1 text-md mx-1 bg-red-500 rounded-lg disabled:bg-slate-500'
            onClick={() => deleteTodo(todo)}
          >
            Delete
          </button>
          <button
            disabled={editForm}
            type='button'
            className='p-1 text-md bg-green-600 rounded-lg disabled:bg-slate-500'
            onClick={() => setEditForm(!editForm)}
          >
            Update
          </button>
          <button
            disabled={!editForm}
            className='p-1 ml-1 text-md bg-green-600 disabled:bg-slate-500 rounded-lg'
            type='submit'
          >
            Save
          </button>
        </form>
      </li>
    </>
  );
}

export default TodoForm;
