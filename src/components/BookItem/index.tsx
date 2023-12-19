import React from 'react';
import { IBook } from '@/interfaces';
import Image from 'next/image';

interface BookItemProps {
  book: IBook;
  onClick: () => void;
}

const BookItem = (props: BookItemProps) => {
  const { book, onClick } = props;

  return (
    <div
      data-testid="book-item-test-id"
      className="group flex flex-col items-center justify-between text-center gap-5 lg:py-7 tracking-wide bg-secondary lg:w-52 cursor-pointer hover:bg-opacity-60 rounded duration-100 relative shadow-sm hover:shadow-none px-2 pt-2 max-[440px]:mx-auto max-[440px]:scale-110 max-[440px]:w-[300px] max-w-[200px]"
      onClick={onClick}
    >
      <div className="w-[108px] h-[155px] relative">
        <Image
          className="group-hover:scale-95 min-h-[155px] group-hover:grayscale-[70%] duration-150"
          src={book.img}
          fill
          alt={`Imagem do livro: ${book.title}`}
        />
      </div>
      <div className="flex text-center h-10">
        <h3 className="text-md text-font_gray font-medium duration-100 leading-4">{book.title}</h3>
      </div>
      <p className="absolute opacity-0 group-hover:opacity-100 -bottom-2 group-hover:bottom-0 mt-16 text-font_gray font-normal text-xs duration-100">
        {book.author}
      </p>
      <span
        className={`group-hover:bg-opacity-50 absolute w-3 h-3 rounded-full top-2 right-2 ${
          book.isLent ? 'bg-primary' : book.isActive ? 'bg-[#00ff00]' : 'bg-inactive_color'
        }`}
      ></span>
    </div>
  );
};

export default BookItem;
