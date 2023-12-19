import Li from '../CustomList/Li';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const renderComponent = (left: boolean = false, right: boolean = false) => {
  render(
    <Li left={left} right={right}>
      Teste
    </Li>
  );
};

describe('Custom Li tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('li-test-id')).toBeInTheDocument();
  });

  it('should have padding left when parse left on props', () => {
    renderComponent(true);

    expect(screen.getByTestId('li-test-id')).toHaveClass('pl-10');
  });

  it('should have padding right when parse right on props', () => {
    renderComponent(false, true);

    expect(screen.getByTestId('li-test-id')).toHaveClass('pr-10');
  });
});
