import { MessageProvider } from '@/contexts/messageContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActiveButton from '../Buttons/DefaultButton';
import { mockBook } from '@/mocks/book';
import '@testing-library/jest-dom';
import Button from '../Buttons/DefaultButton';

const onClickSpy = jest.fn();

const renderComponent = (loading?: boolean, submit?: boolean) => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <Button
          title="Emprestar"
          onClick={onClickSpy}
          loading={loading ? loading : false}
          submit={submit ? submit : false}
        />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('DefaultButton tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('Emprestar-test-id'));
  });

  it('should call the onClick when click on button', () => {
    renderComponent();
    const button = screen.getByTestId('Emprestar-test-id');

    fireEvent.click(button);

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should be loading button when parse it on props', () => {
    renderComponent(true);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should be submit button when parse it on props', () => {
    renderComponent(false, true);

    const button = screen.getByTestId('Emprestar-test-id') as HTMLButtonElement;

    expect(button.type).toBe('submit');
  });
});
