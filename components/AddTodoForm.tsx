import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

const AddTodoForm = () => {
  const [inputTodo, setInputTodo] = useState('');
  const { data: session } = useSession();
  const queryClient = useQueryClient()
  const router = useRouter();

  const addTodo = useMutation(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setInputTodo('');
      e.preventDefault();
      const respone = await fetch('/api/post', {
        method: 'POST',
        body: inputTodo,
      });
      if (!respone.ok) throw new Error('Network is brokennnnn');
      return respone.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allpage');
        router.push('/');
      },
    }
  );

  const onChange = (e: any) => {
    setInputTodo(e.target.value);
  };
  return (
    <>
      {addTodo.isLoading ? (
        <div>Adding Todo, please wait</div>
      ) : (
        <>
          {addTodo.isError ? (
            <div>{`Something wrong when adding : ${addTodo.error}`}</div>
          ) : null}
          {addTodo.isSuccess ? <></> : null}
          <form onSubmit={(e) => addTodo.mutate(e)}>
            <input
              onChange={(e) => onChange(e)}
              className='border border-yellow-500 focus:border-yellow-800 outline-none'
              value={inputTodo}
              placeholder=''
            />
            <button
              type='submit'
              disabled={session?.user ? false : true}
              hidden={session?.user ? false : true}
              className='p-2 mx-1 bg-green-600 rounded-lg disabled:bg-green-300 '
            >
              Add
            </button>
            <button
              type='button'
              disabled={session?.user ? true : false}
              hidden={session?.user ? true : false}
              className='p-2 mx-1 bg-blue-600 rounded-lg disabled:bg-green-300'
              onClick={() => signIn()}
            >
              Sign In
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
      )}
    </>
  );
};

export default AddTodoForm;
