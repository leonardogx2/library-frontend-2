import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import ModalBookDelete from '../ModalBookDelete';
import { mockBook } from '@/mocks/book';
import { deleteBook } from '@/services/book/deleteBook';

const onCloseSpy = jest.fn();
const setBooksSpy = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/services/book/deleteBook');

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <ModalBookDelete onClose={onCloseSpy} setBooks={setBooksSpy} books={[mockBook]} book={mockBook} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ModalBookDelete tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-delete-test-id')).toBeInTheDocument();
  });

  it('should call deleteBook on submit', async () => {
    renderComponent();
    const form = screen.getByTestId('form-test-id') as HTMLFormElement;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(deleteBook).toHaveBeenCalled();
    });
  });
});
