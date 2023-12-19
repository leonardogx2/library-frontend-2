import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Inputs/Input';

const setValueSpy = jest.fn();

const renderComponent = () => {
  render(<Input label="Test" id="input" value="value" setValue={setValueSpy}></Input>);
};

describe('Input tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('input-test-id')).toBeInTheDocument();
  });

  it('should set new value on change', async () => {
    renderComponent();
    const input = screen.getByTestId('input-test-id') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(setValueSpy).toHaveBeenCalled();
    });
  });
});
