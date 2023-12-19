import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import Navbar from '../Navbar';
import { logoutUser } from '@/lib/user';

jest.mock('@/lib/user');

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <Navbar />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('Navbar tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('navbar-test-id')).toBeInTheDocument();
  });

  it('should call the logout function when click on logout button', async () => {
    renderComponent();
    const openLogoutContainerButton = screen.getByTestId('open-logout-container-test-id');

    fireEvent.click(openLogoutContainerButton);
    const logoutButton = screen.getByTestId('logout-container-test-id');
    fireEvent.click(logoutButton);

    expect(logoutUser).toHaveBeenCalled();
  });
});
