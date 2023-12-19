import { RefObject } from 'react';

export interface CustomTextareaRefProps {
  value: string | undefined;
  setValue: any;
  label: string;
  id: string;
  large?: boolean;
  small?: boolean;
}

const TextareaRef = (props: CustomTextareaRefProps) => {
  const { value, setValue, id, label, large, small } = props;
  return (
    <div className="group relative h-10 flex items-center">
      <textarea
        id={id}
        data-testid={id + '-test-id'}
        className={`peer pt-4 focus:border-primary resize-none border border-input_color rounded focus:outline-none focus:text-black text-white py-3 pl-2 ease-in duration-100 valid:text-black ${
          large ? 'w-96 h-40' : small ? 'w-72 h-28' : 'w-80 h-32'
        }`}
        required
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <label
        htmlFor={id}
        className="group-focus-within:text-sm absolute left-2 -top-8 group-focus-within:-top-14 group-focus-within:bg-white px-1 ease-in duration-75 peer-valid:text-sm peer-valid:bg-white peer-valid:-top-14"
      >
        {label}
      </label>
    </div>
  );
};

export default TextareaRef;
