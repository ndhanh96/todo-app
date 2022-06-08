import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router'

function TodoForm({
  todo,
  updateTodo,
  userEmail,
  postID,
}: {
  todo?: string | null;
  updateTodo: any;
  userEmail: string | null;
  postID: number | null;
}) {
  const [editForm, setEditForm] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<string | null | undefined>('');
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter()
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentTodo(e.currentTarget.value);
    console.log(currentTodo);
  };

  useEffect(() => {
    setCurrentTodo(todo);
  }, [todo]);

  const updateTodoFunc = async (value: string | null | undefined) => {
    const data = {
      post_id: postID,
      content: value!,
      email: session?.user?.email,
      title: 'test',
    };
    const updateCurrentTodo = await fetch('/api/updatetodo', {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return updateCurrentTodo.json();
  };

  const handleDelete = async () => {
    const respond = await fetch('/api/post', {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'DELETE',
      body: JSON.stringify({
        post_id: postID,
      }),
    });
    return respond.json();
  };
  const deleteTodo = () => {
    handleDelete()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const deleteTodoQuery = useMutation(async () => {
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
  }, {
    onSuccess: () => router.push('/')
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodoFunc(currentTodo)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    console.log(currentTodo);
  };
  return (
    <>
      {deleteTodoQuery.isLoading ? (
        <div className='flex w-full justify-center'>
          <p className='text-cyan-600'>Deleting Todo</p>
        </div>
        
      ) : (
        <>
          {deleteTodoQuery.isError ? (
            <div>{`error ${deleteTodoQuery.error}`}</div>
          ) : null}
          {deleteTodoQuery.isSuccess ? <></> : null}
          <li>
            <form className='flex justify-center my-1 ' onSubmit={handleSubmit}>
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
                  deleteTodoQuery.mutate();
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
