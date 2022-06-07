import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AddTodoForm = () => {
  const [inputTodo, setInputTodo] = useState('');
  const { data: session } = useSession();

  const sendTodo = async () => {
    const todo = await fetch('/api/post', {
      method: 'POST',
      body: inputTodo,
    });
    return todo.json();
  };

  const deleteTodo = (todoToDelete) => {
    // const getTodos = [...todos];
    // const newTodos = getTodos.filter((todo) => todo != todoToDelete);
    // setTodos(newTodos);
    // console.log(newTodos);
  };

  const addTodo = (addedTodo) => {
    // setTodos([...todos, addedTodo]);
    // setInputTodo('');
  };

  const updateTodo = (oldTodo, updatedTodo) => {
    // console.log(updatedTodo);
    // const updatedTodos = todos.map((todo) => {
    //   return todo == oldTodo ? (todo = updatedTodo) : todo;
    // });
    // setTodos(updatedTodos);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!session) {
      signIn();
    }
    sendTodo().then((data) => console.log(data)).catch(error => console.log(error));
    // setTodos([...todos, inputTodo]);
    // setInputTodo('');
  };

  const onChange = (e: any) => {
    setInputTodo(e.target.value);
  };
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
          onClick={() => signOut()}
          className='p-2 bg-red-600 rounded-lg'
          disabled={session?.user ? false : true}
          hidden={session?.user ? false : true}
        >
          SignOut
        </button>
      </form>
    </>
  );
};

export default AddTodoForm;
