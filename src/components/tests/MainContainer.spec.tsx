import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContainer from '../MainContainer';

const renderComponent = () => {
  render(
    <MainContainer>
      <p data-testid="children-test-id">Olá</p>
    </MainContainer>
  );
};

describe('MainContainer tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('main-container-test-id')).toBeInTheDocument();
  });

  it('should render the children', () => {
    renderComponent();

    expect(screen.getByTestId('children-test-id')).toBeInTheDocument();
  });
});
