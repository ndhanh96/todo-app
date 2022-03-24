import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const filledInput = useRef('');

  const deleteTodo = (deleteTodo) => {
    const getTodos = [...todos];
    const newTodos = getTodos.filter((todo) => {
      return todo != deleteTodo;
    });
    setTodos(newTodos);
  };

  const addTodo = (addedTodo) => {
    setTodos([...todos, addedTodo]);
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
        <input ref={filledInput} placeholder='' />
        <button onClick={() => addTodo(filledInput.current.value)} type='submit'>Add</button>
        <button onClick={() => deleteTodo(filledInput.current.value)}>Delete todo</button>
      </form>
    </div>
  );
}
