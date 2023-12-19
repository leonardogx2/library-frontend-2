import { MessageProvider } from '@/contexts/messageContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LentButton from '../Buttons/LentButton';

const onClickSpy = jest.fn();

const renderComponent = (toReturn: boolean = false, disabled: boolean = false) => {
  render(
    <BrowserRouter>
      <MessageProvider>
        <LentButton onClick={onClickSpy} toReturn={toReturn} disabled={disabled} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('LentButton tests', () => {
  it('should render the component', () => {
    renderComponent();

    const button = screen.getByTestId('button-enabled-test-id') as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Emprestar');
  });

  it('should call the onClick when click on button', () => {
    renderComponent();
    const button = screen.getByTestId('button-enabled-test-id');

    fireEvent.click(button);

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should be disabled button when parse it on props', () => {
    renderComponent(false, true);

    expect(screen.getByTestId('button-disabled-test-id')).toBeInTheDocument();
  });

  it('should change the title when parse toReturn on props', () => {
    renderComponent(true, false);

    const button = screen.getByTestId('button-enabled-test-id') as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Devolver');
  });
});
