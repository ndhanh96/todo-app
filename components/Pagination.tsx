import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

interface totalPage {
  totalPage: Number[] | undefined
}

const Pagination = ({ totalPage }:totalPage) => {
  return (
    <div className='flex text-sm'>
      {totalPage &&
        totalPage.map((p,i) => (
          <Link key={i} href={`/?page=${p}`}>
            <button className='py-1 px-2 mx-1 bg-zinc-300 rounded'>
              {`${p}`}
            </button>
          </Link>
        ))}
    </div>
  );
}

export default Pagination;
