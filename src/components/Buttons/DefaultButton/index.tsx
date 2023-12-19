import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface ButtonProps {
  className?: string;
  title: string;
  onClick?: () => void;
  submit?: boolean;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={`${props.submit ? 'submit' : 'button'}`}
      data-testid={props.title + '-test-id'}
      onClick={!props.loading ? props.onClick : () => {}}
      className={`border rounded p-3 px-6 font-bold duration-100 ${
        props.loading ? 'cursor-default' : 'hover:scale-95'
      } ${props.className} relative`}
    >
      <p data-testid={props.loading ? 'loading' : 'not-loading'} className={props.loading ? 'text-transparent' : ''}>
        {props.title}
      </p>
      {props.loading ? (
        <div className="flex items-center justify-center absolute w-full h-full top-0 left-0">
          <span className="animate-spin">
            <AiOutlineLoading />
          </span>
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
