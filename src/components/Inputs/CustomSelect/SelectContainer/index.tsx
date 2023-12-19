import { IOption } from '@/interfaces';
import SelectItem from '../SelectItem';

interface SelectContainerProps {
  selectHandler: () => void;
  setValue: any;
  options: IOption[];
  size: string;
  onChange?: () => void;
}

const SelectContainer = (props: SelectContainerProps) => {
  const { selectHandler, setValue, options, size, onChange } = props;

  return (
    <div
      data-testid="select-container-test-id"
      className="absolute z-30 -top-0 animate-smooth-top-select mt-12 shadow-lg rounded"
      onClick={selectHandler}
    >
      {options.map((option: IOption) => (
        <SelectItem
          key={option.value}
          size={size}
          onClick={() => {
            setValue(option.title);
            if (onChange) onChange();
          }}
          text={option.title}
        />
      ))}
    </div>
  );
};

export default SelectContainer;
