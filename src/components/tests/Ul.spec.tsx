import Ul from '../CustomList/Ul';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Li from '../CustomList/Li';

const renderComponent = (left: boolean = false, right: boolean = false) => {
  render(
    <Ul title="Titulo" left={left} right={right}>
      <Li>Li test</Li>
    </Ul>
  );
};

describe('Ul tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('ul-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('li-test-id')).toBeInTheDocument();
  });

  it('should have margin left when parse left on props', () => {
    renderComponent(true);

    expect(screen.getByTestId('ul-test-id')).toHaveClass('ml-10');
  });

  it('should have margin right when parse right on props', () => {
    renderComponent(false, true);

    expect(screen.getByTestId('ul-test-id')).toHaveClass('mr-10');
  });
});
