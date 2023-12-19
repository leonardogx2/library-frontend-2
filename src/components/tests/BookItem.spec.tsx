import { fireEvent, render, screen } from '@testing-library/react';
import BookItem from '../BookItem';
import { MessageProvider } from '@/contexts/messageContext';
import { BrowserRouter } from 'react-router-dom';
import { mockBook } from '@/mocks/book';
import '@testing-library/jest-dom';

const onClickSpy = jest.fn();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <BookItem book={mockBook} onClick={onClickSpy} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('BookItem tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('book-item-test-id')).toBeInTheDocument();
  });

  it('should call onClick when click on book item', () => {
    renderComponent();
    const component = screen.getByTestId('book-item-test-id');

    fireEvent.click(component);

    expect(onClickSpy).toHaveBeenCalled();
  });
});
