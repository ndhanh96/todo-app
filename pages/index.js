import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import TodoForm from '../components/TodoForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [todos, setTodos] = useState(['test']);
  const filledInput = useRef('');

  const deleteTodo = (deleteTodo) => {
    const getTodos = [...todos];
    const newTodos = getTodos.filter((todo) => {
      return todo != deleteTodo;
    });
    setTodos(newTodos);
    filledInput.current.value = '';
  };

  const addTodo = (addedTodo) => {
    setTodos([...todos, addedTodo]);
    filledInput.current.value = '';
  };

  const updateTodo = (oldTodo, updatedTodo) => {
    console.log(updatedTodo);
    const updatedTodos = todos.map((todo) => {
      return todo == oldTodo ? (todo = updatedTodo) : todo;
    });
    setTodos(updatedTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(filledInput.current.value);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div>
      <h1>Todo app</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='border border-yellow-500 focus:border-yellow-800 outline-none'
          ref={filledInput}
          placeholder=''
        />
        <button
          className='p-2 mx-1 bg-slate-600 rounded-lg '
          onClick={() => addTodo(filledInput.current.value)}
          type='submit'
        >
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoForm
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}
