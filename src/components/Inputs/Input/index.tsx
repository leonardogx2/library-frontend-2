import React, { RefObject, useState } from 'react';

export interface CustomInputRefProps {
  value?: string | undefined;
  setValue: any;
  label: string;
  id: string;
  type?: string;
  large?: boolean;
  small?: boolean;
}

const Input = (props: CustomInputRefProps) => {
  const { id, type, value, setValue, large, small, label } = props;
  return (
    <div className="group relative h-10 flex items-center">
      <input
        data-testid={id + '-test-id'}
        id={id}
        className={`peer border border-input_color rounded focus:outline-none focus:text-black focus:border-primary text-white py-3 pl-2 ease-in duration-100 valid:text-black ${
          small ? 'w-72' : large ? 'w-96' : 'w-80'
        }`}
        type={type || 'text'}
        required
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
      <label
        htmlFor={id}
        className="group-focus-within:text-sm absolute left-2 top-2 group-focus-within:-top-3 group-focus-within:bg-white px-1 ease-in duration-75 peer-valid:text-sm peer-valid:bg-white peer-valid:-top-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
