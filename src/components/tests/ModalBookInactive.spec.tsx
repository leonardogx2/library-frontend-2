import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import ModalBookInactive from '../ModalBookInactive';
import { mockBook } from '@/mocks/book';
import { updateBook } from '@/services/book/updatebook';

jest.mock('@/services/book/updatebook');

const onCloseSpy = jest.fn();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <ModalBookInactive onClose={onCloseSpy} book={mockBook} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ModalBookInactive tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-inactive-test-id'));
  });

  it('should not call updateBook when submit form without description', async () => {
    renderComponent();
    const textarea = screen.getByTestId('description-input-test-id') as HTMLTextAreaElement;
    const form = screen.getByTestId('form-test-id') as HTMLFormElement;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(updateBook).not.toHaveBeenCalled();
    });
  });

  it('should call updateBook when submit form with description', async () => {
    renderComponent();
    const textarea = screen.getByTestId('description-input-test-id') as HTMLTextAreaElement;
    const form = screen.getByTestId('form-test-id') as HTMLFormElement;

    fireEvent.change(textarea, { target: { value: 'Test' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(updateBook).toHaveBeenCalled();
    });
  });
});
