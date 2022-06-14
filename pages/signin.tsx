import {
  getProviders,
  signIn,
  useSession,
} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const SignIn = ({ providers }: { providers: any }) => {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const router = useRouter();
  
  if (session) {
    router.push('/');
  }

  const isSignIn = useMutation(
    async (data: any) => {
      const respone: any = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!respone.ok) throw new Error('something wrong');
      return respone; //signIn already return json object so no need for .json()
    },
    {
      onSuccess: () => router.push('/'),
    }
  );

  return (
    <>
      {isSignIn.isLoading ? (
        <div className='text-white'>Logining ......</div>
      ) : (
        <>
          {isSignIn.isError ? <div>Something wrong happen</div> : <></>}
          {isSignIn.isSuccess ? <></> : null}
          <div className='flex flex-col h-72 py-2 px-2 justify-between rounded-md bg-green-500'>
            {Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return;
              return (
                <div key={provider.name}>
                  <button
                    className=' p-2  bg-red-600 text-white rounded-md'
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            })}
            <div className=''>
              <form
                className='flex flex-col items-start w-full gap-1'
                onSubmit={handleSubmit((data) => isSignIn.mutate(data))}
              >
                <label className='flex w-full justify-between'>
                  Email:
                  <input
                    type='email'
                    {...register('email', {
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      required: true,
                    })}
                  ></input>
                </label>

                <label className='flex w-full justify-between'>
                  Password:
                  <input
                    type='password'
                    {...register('password', {
                      required: true,
                    })}
                  />
                </label>

                <button
                  className='flex bg-cyan-300 p-2 rounded-md w-auto m-auto'
                  type='submit'
                >
                  Sign in
                </button>
              </form>
            </div>

            <div className=''>
              <Link href={'/signup'}>
                <button className='text-smborder rounded-md p-2 border-cyan-300 bg-blue-700 text-white'>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default SignIn;
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
