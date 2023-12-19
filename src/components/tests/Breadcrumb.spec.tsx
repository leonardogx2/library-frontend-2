import { fireEvent, render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';
import { MessageProvider } from '@/contexts/messageContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <Breadcrumb backward={'Home'} now={'Biblioteca'} to={'/'} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('Breadcrumb tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('breadcrumb-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('link-test-id')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('/ ' + 'Biblioteca')).toBeInTheDocument();
  });
});
