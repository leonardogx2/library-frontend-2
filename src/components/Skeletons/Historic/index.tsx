import React from 'react';

const Historic = () => {
  const SkeletonUl = () => {
    return (
      <div className="w-full mt-10 flex gap-24 border-b border-b-skeleton-gray pb-4">
        <span className={`h-6 bg-skeleton-gray w-28 ml-10`}></span>
        <span className="h-6 bg-skeleton-gray w-14"></span>
        <span className="h-6 bg-skeleton-gray w-48 ml-16"></span>
        <span className="h-6 bg-skeleton-gray w-28 ml-10"></span>
        <span className="h-6 bg-skeleton-gray w-28 ml-10"></span>
      </div>
    );
  };

  return (
    <div className="m-auto w-full animate-pulse">
      <div className="h-11 w-full bg-skeleton-gray"></div>
      <SkeletonUl />
      <SkeletonUl />
      <SkeletonUl />
      <SkeletonUl />
    </div>
  );
};

export default Historic;
