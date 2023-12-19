import React, { ChangeEvent, ChangeEventHandler, InputHTMLAttributes } from 'react';
import Image from 'next/image';

interface ImageInputProps {
  preview?: string | undefined;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = (props: ImageInputProps) => {
  const { preview, handler } = props;

  const Input = () => {
    return (
      <div className="select-none relative mx-auto">
        <label
          data-testid={'img-test-id'}
          htmlFor="image-input"
          className="border-2 border-dashed border-primary w-40 h-52 flex justify-center items-center text-primary gap-2 cursor-pointer"
        >
          <Image src={'/assets/img/add-icon.png'} width={20} height={20} alt="Add image icon" />
          <p className="font-bold">Capa</p>
          {preview ? <Image src={preview} alt="Book image" fill /> : <></>}
        </label>
        <input data-testid="img-input-test-id" id="image-input" type="file" className="hidden" onChange={handler} />
      </div>
    );
  };

  return <Input />;
};

export default ImageInput;
