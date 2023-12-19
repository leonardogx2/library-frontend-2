import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageInput from '../Inputs/ImageInput';

const handlerSpy = jest.fn();

const renderComponent = () => {
  render(<ImageInput handler={handlerSpy} />);
};

describe('ImageInput tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('img-test-id')).toBeInTheDocument();
  });

  it('should call the handler on change', () => {
    renderComponent();
    const imageInput = screen.getByTestId('img-input-test-id');

    fireEvent.change(imageInput, '');

    expect(handlerSpy).toHaveBeenCalled();
  });
});
