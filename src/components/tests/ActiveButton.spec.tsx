import { MessageProvider } from '@/contexts/messageContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActiveButton from '../Buttons/ActiveButton';
import { mockBook } from '@/mocks/book';
import { updateBook } from '@/services/book/updatebook';
import '@testing-library/jest-dom';

jest.mock('@/services/book/updatebook', () => ({
  updateBook: jest.fn(),
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <ActiveButton book={mockBook} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ActiveButton tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('Ativar-test-id')).toBeInTheDocument();
  });

  it('should call updateBook when click on button', () => {
    renderComponent();
    const button = screen.getByTestId('Ativar-test-id');

    fireEvent.click(button);

    expect(updateBook).toHaveBeenCalled();
  });
});
