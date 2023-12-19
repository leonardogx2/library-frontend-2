import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextareaRef from '../Inputs/Textarea';

const setValueSpy = jest.fn();

const renderComponent = () => {
  render(<TextareaRef value="test" label="textarea" id="textarea" setValue={setValueSpy} />);
};

describe('Textarea tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('textarea-test-id')).toBeInTheDocument();
  });

  it('should call the setValue on change', () => {
    renderComponent();
    const textarea = screen.getByTestId('textarea-test-id') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'Test' } });

    expect(setValueSpy).toHaveBeenCalled();
  });
});
