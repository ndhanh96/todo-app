import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const signup = useMutation(
    async (data: any) => {
      const respone = await fetch('/api/user/signup', {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!respone.ok) throw new Error(respone.status.toString());
      return respone.json();
    },
    {
      onSuccess: () => router.push('/signin'),
    }
  );

  return (
    <>
      {signup.isLoading ? (
        <div>Signing Up....</div>
      ) : (
        <>
          {signup.isError ? <div>something wrong</div> : null}
          {signup.isSuccess ? <></> : null}
          <div className='flex h-56 flex-col justify-around border-2 border-cyan-400 px-2 my-4 rounded-md'>
            <h1 className='text-2xl text-center'>Sign Up</h1>
            <form
              onSubmit={handleSubmit((data) => signup.mutate(data))}
              className='w-full flex flex-col gap-1'
            >
              <label className='flex justify-between '>
                Email:
                <input
                  type='email'
                  {...register('email', { required: true })}
                  className='focus:outline-green-600 rounded-sm'
                ></input>
              </label>
              <label className='flex justify-between'>
                Password:
                <input
                  type='password'
                  {...register('password', { required: true })}
                  className=' focus:outline-blue-600 rounded-sm '
                ></input>
              </label>
              <button
                type='submit'
                className='bg-cyan-300 p-2 rounded-md my-2 mx-auto'
              >
                Sign up
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
