import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalBookLent from '../ModalBookLent';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import { mockBook } from '@/mocks/book';
import { createRent } from '@/services/rent/createRent';

jest.mock('@/services/rent/createRent');

const onCloseSpy = jest.fn();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <ModalBookLent onClose={onCloseSpy} book={mockBook} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ModalBookLent tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-lent-test-id')).toBeInTheDocument();
  });

  it('should not call the createRent without data', () => {
    renderComponent();
    const form = screen.getByTestId('form-test-id') as HTMLFormElement;

    fireEvent.submit(form);

    expect(createRent).not.toHaveBeenCalled();
  });

  it('should call the createRent when all inputs are with data', () => {
    renderComponent();
    const form = screen.getByTestId('form-test-id') as HTMLFormElement;
    const nameInput = screen.getByTestId('name-test-id') as HTMLInputElement;
    const classInput = screen.getByTestId('class-test-id') as HTMLInputElement;
    const withdrawalInput = screen.getByTestId('withdrawalDate-test-id') as HTMLInputElement;
    const deliveryInput = screen.getByTestId('deliveryDate-test-id') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(classInput, { target: { value: 'Test' } });
    fireEvent.change(withdrawalInput, { target: { value: '2023-12-10' } });
    fireEvent.change(deliveryInput, { target: { value: '2023-12-11' } });
    fireEvent.submit(form);

    expect(createRent).toHaveBeenCalled();
  });
});
