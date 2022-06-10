import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';

interface totalPage {
  isLoading: boolean;
  error: unknown;
  data: Number[] | undefined;
  isFetching: boolean;
}

const Pagination = () => {
  const [page,setPage] = useState<Number[]|null>()
  const { isLoading, error, data } = useQuery(
    'allpage',
    async () => {
      const respone = await fetch('/api/todototal');
      if (!respone.ok) throw new Error('error while fetching all page');
      return respone.json();
    }
  );
  if (isLoading) return <div>Loading.....</div>;
  if (error) return <div>{'can\'t get page'}</div>;
  if (data) {
    const arr = [...Array(Math.ceil(data) + 1).keys()];
    arr.splice(0, 1);
    console.log('arr', arr);
    if (page?.length != arr.length) setPage(arr);
    
  }
  return (
    <div className='flex text-sm'>
      {page && page.map((p, i) => (
        <Link key={i} href={`/?page=${p}`}>
          <button className='py-1 px-2 mx-1 bg-zinc-300 rounded'>
            {`${p}`}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
