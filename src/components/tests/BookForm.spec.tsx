import { MessageProvider } from '@/contexts/messageContext';
import BookForm from '../BookForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => 'random-id',
  useRouter: jest.fn(),
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <BookForm />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('BookForm tests', () => {
  it('should render the component', async () => {
    renderComponent();

    expect(screen.getByTestId('systemEntryDate-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('title-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('synopsis-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('img-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('genre-test-id')).toBeInTheDocument();
  });

  it('should change the field', async () => {
    renderComponent();
    const titleInput = screen.getByTestId('title-test-id') as HTMLInputElement;

    fireEvent.input(titleInput, { target: { value: 'Novo título' } });

    expect(titleInput.value).toBe('Novo título');
  });
});
