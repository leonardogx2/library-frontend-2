import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/contexts/messageContext';
import ModalBookHistoric from '../ModalBookHistoric';
import { IRent } from '@/interfaces';

const onCloseSpy = jest.fn();

const renderComponent = (withRent: boolean = false) => {
  const rents: IRent[] = [
    {
      bookId: 'any-id',
      student_name: 'Leonardo',
      class: 'T40',
      withdrawalDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
    },
  ];

  render(
    <BrowserRouter>
      <MessageProvider>
        <ModalBookHistoric onClose={onCloseSpy} rentHistory={withRent ? rents : []} />
      </MessageProvider>
    </BrowserRouter>
  );
};

describe('ModalBookHistoric tests', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByTestId('modal-historic-test-id'));
  });

  it('should render rents', () => {
    renderComponent(true);

    expect(screen.getAllByTestId('li-test-id')).toHaveLength(4);
  });
});
