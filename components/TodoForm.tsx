import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

function TodoForm({
  todo,
  userEmail,
  postID,
}: {
  todo?: string | null;
  userEmail: string | null;
  postID: number | null;
}) {
  const [editForm, setEditForm] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<string | null | undefined>('');
  const { data: session } = useSession();
  const router = useRouter();
  console.log('check router', router.asPath);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentTodo(e.currentTarget.value);
    console.log(currentTodo);
  };

  useEffect(() => {
    setCurrentTodo(todo);
  }, [todo]);

  const updateTodo = useMutation(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        post_id: postID,
        content: currentTodo,
        email: session?.user?.email,
        title: 'test',
      };
      const respone = await fetch('/api/updatetodo', {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (!respone.ok) throw new Error('update error');
      return respone.json();
    },
    {
      onSuccess: () => {
        setEditForm(!editForm);
        router.push(`/${router.asPath}`);
      },
    }
  );

  const deleteTodo = useMutation(
    async () => {
      const respone = await fetch('/api/post', {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'DELETE',
        body: JSON.stringify({
          post_id: postID,
        }),
      });
      if (!respone.ok) throw new Error('Network is error');
      return respone.json();
    },
    {
      onSuccess: () => router.push(`/${router.asPath}`),
    }
  );

  return (
    <>
      {deleteTodo.isLoading || updateTodo.isLoading ? (
        <div className='flex w-full justify-center'>
          <p className='text-cyan-600'>
            {deleteTodo.isLoading ? 'Deleting Todo' : 'Updating Todo'}
          </p>
        </div>
      ) : (
        <>
          {deleteTodo.isError || updateTodo.isError ? (
            <div>{`error ${deleteTodo.error}`}</div>
          ) : null}
          {deleteTodo.isSuccess || updateTodo.isSuccess ? <></> : null}
          <li>
            <form
              className='flex justify-center my-1 '
              onSubmit={(e) => updateTodo.mutate(e)}
            >
              <input
                disabled={!editForm}
                className='border border-yellow-400 outline-none disabled:bg-blue-300 bg-blue-500 rounded-md'
                value={currentTodo!}
                onChange={handleChange}
              />

              <button
                disabled={
                  session && userEmail == session.user?.email ? false : true
                }
                hidden={
                  session && userEmail == session.user?.email ? false : true
                }
                type='button'
                className='p-1 text-md mx-1 bg-red-500 rounded-lg disabled:bg-slate-500'
                onClick={() => {
                  deleteTodo.mutate();
                }}
              >
                Delete
              </button>
              <button
                disabled={
                  session && userEmail == session.user?.email ? false : true
                }
                hidden={
                  session && userEmail == session.user?.email ? false : true
                }
                type='button'
                className='p-1 text-md bg-green-600 rounded-lg disabled:bg-slate-500'
                onClick={() => setEditForm(!editForm)}
              >
                Update
              </button>
              <button
                disabled={
                  session && userEmail == session.user?.email ? false : true
                }
                hidden={
                  session && userEmail == session.user?.email ? false : true
                }
                className='p-1 ml-1 text-md bg-green-600 disabled:bg-slate-500 rounded-lg'
                type='submit'
              >
                Save
              </button>
            </form>
          </li>
        </>
      )}
    </>
  );
}

export default TodoForm;
