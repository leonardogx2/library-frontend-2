import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ backward, now, to }: { backward: string; now: string; to: string }) => {
  return (
    <div
      data-testid="breadcrumb-test-id"
      className="flex gap-1 absolute self-start justify-self-start left-4 sm:left-12 mt-6 text-md sm:text-lg"
    >
      <Link data-testid="link-test-id" href={to} className="flex">
        <span className="sm:text-xl">❮</span>
        <p className="text-gray ml-2">{backward}</p>
      </Link>
      <b> / {now}</b>
    </div>
  );
};

export default Breadcrumb;
