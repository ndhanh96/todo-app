import { Post } from '@prisma/client';
import { prisma } from '../prisma/db';
import TodoForm from '../components/TodoForm';
import { GetServerSideProps } from 'next';
import Pagination from '../components/Pagination';
import AddTodoForm from '../components/AddTodoForm';

const Home = ({ AllPosts }: { AllPosts: Post[] }) => {
  return (
    <div className='w-10/12 flex flex-col gap-4'>
      <AddTodoForm />
      <ul className=''>
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
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let page = Number(query.page);
  page > 1 && !isNaN(page) ? '' : (page = 1);

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
