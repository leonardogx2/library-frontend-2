import Image from 'next/image';
import SelectContainer from '../SelectContainer';
import { IOption } from '@/interfaces';

interface CustomSelectProps {
  label: string;
  value: string | undefined;
  defaultValue?: string;
  setValue: any;
  isSelectOpen: boolean;
  selectHandler: () => void;
  options: IOption[];
  large?: boolean;
  small?: boolean;
  onChange?: () => void;
  className?: string;
  id: string;
}

const Select = (props: CustomSelectProps) => {
  const { label, setValue, value, isSelectOpen, selectHandler, options, small, large, className, onChange, id } = props;

  return (
    <>
      <div
        data-testid={id + '-test-id'}
        className="select-none group relative flex items-center h-10 transition-all bg-white"
      >
        <div
          data-testid={id + '-handler-container-test-id'}
          onClick={selectHandler}
          className={`relative border rounded h-12 p-2 py-3 ${className} ${large ? 'w-96' : small ? 'w-60' : 'w-80'} ${
            isSelectOpen ? 'border-primary' : ''
          }`}
        >
          <span
            className={`bg-white select-none absolute px-1 ease-linear ${
              value ? 'text-sm -top-2.5' : isSelectOpen ? 'text-sm animate-getup translated' : 'top-3 animate-getdown'
            }`}
          >
            {label}
          </span>
          <Image
            className={`absolute right-4 top-5 ${isSelectOpen ? 'animate-rotateup rotate-180' : ''}`}
            width={'10'}
            height={'10'}
            src={'/assets/icons/arrow_select_input.svg'}
            alt="arrow icon"
          />
          {value ? <p>{value}</p> : <></>}
        </div>
        {isSelectOpen ? (
          <SelectContainer
            size={small ? 'small' : large ? 'large' : 'normal'}
            options={options}
            selectHandler={selectHandler}
            setValue={setValue}
            onChange={onChange ? onChange : () => {}}
          />
        ) : (
          <></>
        )}
      </div>
      {isSelectOpen ? <div className="absolute w-full h-full top-0 left-0" onClick={selectHandler}></div> : <></>}
    </>
  );
};

export default Select;
