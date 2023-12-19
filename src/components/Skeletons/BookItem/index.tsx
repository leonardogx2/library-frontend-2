import React from 'react';

const BookItem = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-between text-center gap-5 lg:py-7 bg-skeleton-gray bg-opacity-80 lg:w-52 rounded relative shadow-sm">
      <span className="w-[108px] h-[155px] bg-light_gray bg-opacity-40"></span>
      <span className="bg-light_gray bg-opacity-40 w-28 h-4 mb-8"></span>
    </div>
  );
};

export default BookItem;
