import { Post } from '@prisma/client';
import { prisma } from '../prisma/db';
import { useState, useEffect, useRef, Key, ReactNode } from 'react';
import TodoForm from '../components/TodoForm';
import { GetServerSideProps, NextPage } from 'next';
import Pagination from '../components/Pagination';
import AddTodoForm from '../components/AddTodoForm';
import Head from 'next/head'

interface posts {
  posts: Post[];
}

const Home = ({ AllPosts }: { AllPosts: Post[] }) => {
  const [page, setPage] = useState<Number[]>();
  console.log('all the post', AllPosts);

  const getTotalPage = async () => {
    const totalPage = await fetch('/api/todototal');
    return totalPage.json();
  };

  useEffect(() => {
    getTotalPage()
      .then((data) => {
        console.log('data', data);
        //primsa return 0.xx if there is less than 10 todos.
        //number is rounded up
        const arr = [...Array(Math.ceil(data) + 1).keys()];
        arr.splice(0, 1);
        console.log('arr', arr);
        if (page?.length != arr.length) setPage(arr);
      })
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <>
      <AddTodoForm />
      <ul className='basis-full'>
        {AllPosts &&
          AllPosts.map((post, index) => {
            return (
              <TodoForm
                key={index}
                postID={post.post_id}
                todo={post.content}
                userEmail={post.user_email}
              />
            );
          })}
      </ul>
      <Pagination />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let page = Number(query.page);
  page > 1 && !isNaN(page) ? '' : (page = 1);
  // console.log('page query', page);

  const AllPosts = await prisma.post.findMany({
    orderBy: [
      {
        create_at: 'desc',
      },
    ],
    select: {
      user_email: true,
      post_id: true,
      content: true,
    },
    skip: (page - 1) * 10,
    take: 10,
  });
  // console.log(AllPosts)

  return {
    props: { AllPosts },
  };
};

export default Home;
