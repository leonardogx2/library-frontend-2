import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterContainer from '../FilterContainer';
import { MessageProvider } from '@/contexts/messageContext';
import { BrowserRouter } from 'react-router-dom';
import { mockBook } from '@/mocks/book';
import { getAllBooks as getAllBooksService } from '@/services/book/getAllBooks';

const setBooksSpy = jest.fn();
const setPageSpy = jest.fn();
const setHaveOtherPage = jest.fn();
const books = [mockBook];
const onLoad = jest.fn();

jest.mock('@/services/book/getAllBooks');

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <FilterContainer
          setBooks={setBooksSpy}
          setPage={setPageSpy}
          setHaveOtherPage={setHaveOtherPage}
          books={books}
          onLoad={onLoad}
        />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('FilterContainer tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('filter-container-test-id')).toBeInTheDocument();
  });

  it('should call getAllBooks when type on search input', async () => {
    renderComponent();
    const input = screen.getByTestId('search-test-id') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(getAllBooksService).toHaveBeenCalled();
    });
  });
});
