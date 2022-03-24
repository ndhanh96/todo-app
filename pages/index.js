import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import TodoForm from '../components/TodoForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const filledInput = useRef('');
  const [inputTodo, setInputTodo] = useState('');

  const deleteTodo = (todoToDelete) => {
    const getTodos = [...todos];
    const newTodos = getTodos.filter((todo) => todo != todoToDelete);

    setTodos(newTodos);
    console.log(newTodos);
  };

  const addTodo = (addedTodo) => {
    setTodos([...todos, addedTodo]);
    setInputTodo('');
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
    setTodos([...todos, inputTodo]);
    setInputTodo('');
  };

  const onChange = (e) => {
    setInputTodo(e.target.value);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          className='border border-yellow-500 focus:border-yellow-800 outline-none'
          value={inputTodo}
          placeholder=''
        />
        <button
          type='submit'
          disabled={inputTodo ? false : true}
          className='p-2 mx-1 bg-green-600 rounded-lg disabled:bg-green-300 '
        >
          Add
        </button>
        <button
          type='button'
          onClick={() => setTodos([])}
          className='p-2 bg-red-600 rounded-lg'
        >
          Reset
        </button>
      </form>
      <ul className='basis-full'>
        {todos.map((todo, index) => {
          return (
            <TodoForm
              key={index}
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </ul>
    </>
  );
}
