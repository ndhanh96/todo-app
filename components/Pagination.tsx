import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

interface totalPage {
  totalPage: Number[] | undefined
}

const Pagination:NextPage<totalPage> = ({ totalPage }) => {
  console.log('pagi');
  return (
    <div className='flex text-sm'>
      {totalPage &&
        totalPage.map((p) => (
          <Link href={`/?page=${p}`}>
            <button className='py-1 px-2 mx-1 bg-zinc-300 rounded'>
              {`${p}`}
            </button>
          </Link>
        ))}
    </div>
  );
}

export default Pagination;
