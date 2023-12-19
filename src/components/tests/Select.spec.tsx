import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../Inputs/CustomSelect/Select';
import { IOption } from '@/interfaces';

const setValue = jest.fn();
const selectHandler = jest.fn();
const onChange = jest.fn();
const options: IOption[] = [
  {
    title: 'Option',
    value: 'option',
  },
];

const renderComponent = (isSelectOpen: boolean = false) => {
  render(
    <Select
      value="value"
      label="Teste"
      setValue={setValue}
      isSelectOpen={isSelectOpen}
      selectHandler={selectHandler}
      options={options}
      onChange={onChange}
      id="select"
    />
  );
};

describe('All select components tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('select-test-id'));
  });

  it('should call the handler when click on select', () => {
    renderComponent();
    const select = screen.getByTestId('select-handler-container-test-id');

    fireEvent.click(select);

    expect(selectHandler).toHaveBeenCalled();
  });

  it('should render SelectContainer && SelectItem when select is open', () => {
    renderComponent(true);

    expect(screen.getByTestId('select-test-id'));
    expect(screen.getByTestId('select-container-test-id'));
    expect(screen.getByTestId('Option-test-id'));
  });
});
