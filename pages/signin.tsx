import {
  getCsrfToken,
  getProviders,
  signIn,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SignIn = ({
  providers,
  csrfToken,
}: {
  providers: any;
  csrfToken: any;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn('credentials', { email: email, password: password });
  }

  return (
    <div className='flex flex-col'>
      {Object.values(providers).map((provider: any) => {
        if (provider.id === 'credentials') return;
        return (
          <div key={provider.name}>
            <button
              className='p-2 m-1 bg-blue-600 text-slate-200 rounded-md'
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
      <form
        className='flex flex-col items-start w-full gap-1'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='w-full flex flex-wrap justify-between bg-cyan-300'>
          <span className='bg-zinc-200'>Email</span>
          <input
            className=''
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div className='w-full flex flex-wrap justify-between '>
          <span>Password</span>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button
          className='flex bg-cyan-300 p-2 rounded-md w-auto m-auto'
          type='submit'
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
export default SignIn;
export async function getServerSideProps() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return {
    props: { providers, csrfToken },
  };
}
