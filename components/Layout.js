import React from 'react';

function Layout({ children }) {
  return (
    <div
      id='layout'
      className='flex m-2 sm:mx-12 lg:mx-20 2xl:mx-52 2xl:my-10 py-2 rounded-md flex-wrap justify-center md:text-2xl 2xl:text-4xl bg-yellow-300 '
    >
      <h1 className='basis-full	flex justify-center text-2xl 2xl:text-4xl font-bold	'>
        Todo App
      </h1>
      {children}
    </div>
  );
}

export default Layout;
