import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import ModalBookDetails from '../ModalBookDetails';
import { mockBook } from '@/mocks/book';
import { IBook } from '@/interfaces';

const onCloseSpy = jest.fn();
const onLentClickSpy = jest.fn();
const onInactiveClickSpy = jest.fn();
const onHistoricClickSpy = jest.fn();
const onDeleteClickSpy = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const renderComponent = (book?: IBook) => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <ModalBookDetails
          onClose={onCloseSpy}
          onLentClick={onLentClickSpy}
          onInactiveClick={onInactiveClickSpy}
          onHistoricClick={onHistoricClickSpy}
          onDeleteClick={onDeleteClickSpy}
          book={book ?? mockBook}
        />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ModalBookDetails tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-details-test-id'));
  });
  it('should call the onLentClick when click on lent button', () => {
    renderComponent();
    const lentButton = screen.getByTestId('button-enabled-test-id');

    fireEvent.click(lentButton);

    expect(onLentClickSpy).toHaveBeenCalled();
  });
  it('should call the onInactiveClick when click on inactive button', () => {
    renderComponent();
    const inactiveButton = screen.getByTestId('Inativar-test-id');

    fireEvent.click(inactiveButton);

    expect(onLentClickSpy).toHaveBeenCalled();
  });
  it('should call the onHistoricClick when click on historic button', () => {
    renderComponent();
    const historicButton = screen.getByTestId('Histórico-test-id');

    fireEvent.click(historicButton);

    expect(onLentClickSpy).toHaveBeenCalled();
  });
  it('should call onDeleteClick when click on delete button', () => {
    renderComponent();
    const deleteButton = screen.getByTestId('Deletar-test-id');

    fireEvent.click(deleteButton);

    expect(onLentClickSpy).toHaveBeenCalled();
  });
});
