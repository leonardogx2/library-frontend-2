import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalContainer from '../ModalContainer';

const onCloseSpy = jest.fn();

const renderComponent = () => {
  render(
    <ModalContainer id="main" onClose={onCloseSpy}>
      <p data-testid="children-test-id">Children</p>
    </ModalContainer>
  );
};

describe('ModalContainer tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-main-test-id')).toBeInTheDocument();
  });

  it('should call the onClose when clicked on it', () => {
    renderComponent();
    const button = screen.getByTestId('onclose-test-id-main');

    fireEvent.click(button);

    expect(onCloseSpy).toHaveBeenCalled();
  });
});
