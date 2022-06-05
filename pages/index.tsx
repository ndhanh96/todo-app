import { Post, prisma, PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef, Key, ReactNode } from 'react';
import TodoForm from '../components/TodoForm';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';

interface posts {
  posts: Post[];
}

const Home: NextPage<posts> = ({ posts }) => {
  const [todos, setTodos] = useState({ posts });
  const [page, setPage] = useState<Number[]>();
  const filledInput = useRef('');
  const [inputTodo, setInputTodo] = useState('');
  const getTotalPage = async () => {
    const totalPage = await fetch('/api/todototal');
    return totalPage.json();
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
    // setTodos([...todos, inputTodo]);
    // setInputTodo('');
  };

  const onChange = (e: any) => {
    setInputTodo(e.target.value);
  };

  useEffect(() => {
    getTotalPage()
      .then((data) => {
        const arr = [...Array(data + 1).keys()];
        arr.splice(0, 1);
        if (page?.length != arr.length) setPage(arr);
      })
      .catch((error) => console.error(error));
    console.log(page);
  }, [page]);

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
        {posts.map((post, index) => {
          return (
            <TodoForm
              key={index}
              todo={post.content}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </ul>
      <Pagination totalPage={page} />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let page = Number(query.page);
  page > 1 && !isNaN(page) ? '' : (page = 1);
  console.log('query', page);

  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    skip: (page - 1) * 10,
    take: 10,
  });
  const todoTotal = await prisma.post.count();
  const pageTotal =
    todoTotal % 2 > 0 ? Math.floor(todoTotal / 2) + 1 : todoTotal / 10;

  return {
    props: { posts },
  };
};

export default Home;
