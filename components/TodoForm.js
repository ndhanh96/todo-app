import React from 'react';
import { useState, useRef, useEffect } from 'react';

function TodoForm({ todo, deleteTodo, updateTodo }) {
  const [editForm, setEditForm] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todo);
  // const originalTodo = useRef('');

  const onChange = (e) => {
    e.preventDefault();
    setCurrentTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(todo, currentTodo);
    setEditForm(!editForm);
    console.log('submit');
  };

  return (
    <>
      <li>
        <form onSubmit={handleSubmit}>
          <input
            disabled={!editForm}
            className='border-2 border-yellow-400 outline-none disabled:bg-green-100 bg-green-300 '
            value={currentTodo}
            onChange={(e) => onChange(e)}
          />
          <span>
            <button
              disabled={editForm}
              type='button'
              className='p-2 mx-1 bg-red-600 rounded-lg disabled:bg-slate-500'
              onClick={() => deleteTodo(todo)}
            >
              Delete todo
            </button>
            <button
              disabled={editForm}
              type='button'
              className='p-2 mx-1 bg-green-600 rounded-lg disabled:bg-slate-500'
              onClick={() => setEditForm(!editForm)}
            >
              Update
            </button>
            <button
              disabled={!editForm}
              className='p-2 bg-green-600 disabled:bg-slate-500 rounded-lg'
              type='submit'
            >
              Save
            </button>
          </span>
        </form>
      </li>
    </>
  );
}

export default TodoForm;
