import React, { useRef } from 'react';
import ModalContainer from '../ModalContainer';
import { useState } from 'react';
import LentButton from '../Buttons/LentButton';
import Input from '../Inputs/Input';
import axios, { isAxiosError } from 'axios';
import { IBook } from '@/interfaces';
import { useMessageContext } from '@/contexts/messageContext';
import { createRent } from '@/services/rent/createRent';

const ModalBookLent = ({ onClose, book }: { onClose: () => void; book: IBook }) => {
  // const [name, setName] = useState<string | undefined>(undefined);
  const nameRef = useRef('');
  const classRef = useRef('');
  const withdrawalDateRef = useRef('');
  const deliveryDateRef = useRef('');

  const setName = (value: string) => {
    nameRef.current = value;
  };

  const setClass = (value: string) => {
    classRef.current = value;
  };

  const setWithdrawalDate = (value: string) => {
    withdrawalDateRef.current = value;
  };

  const setDeliveryDate = (value: string) => {
    deliveryDateRef.current = value;
  };

  const { setMessage } = useMessageContext();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current;
    const class_ = classRef.current;
    const withdrawalDate = withdrawalDateRef.current;
    const deliveryDate = deliveryDateRef.current;

    console.log(name, class_, withdrawalDate, deliveryDate);
    if (name !== undefined && class_ !== undefined && withdrawalDate !== undefined && deliveryDate !== undefined) {
      if (withdrawalDate < deliveryDate) {
        const formattedWithdrawalDate = new Date(withdrawalDate);
        const formattedDeliveryDate = new Date(deliveryDate);

        const payload = {
          bookId: book.id,
          student_name: name,
          class: class_,
          withdrawalDate: formattedWithdrawalDate,
          deliveryDate: formattedDeliveryDate,
        };
        try {
          await createRent(payload);
          if (book.rents !== undefined) {
            book.rents?.push({
              bookId: book.id,
              student_name: payload.student_name,
              class: payload.class,
              withdrawalDate,
              deliveryDate,
            });
          } else {
            book.rents = [
              {
                bookId: book.id,
                student_name: payload.student_name,
                class: payload.class,
                withdrawalDate,
                deliveryDate,
              },
            ];
          }
          book.isLent = true;
          onClose();
          return setMessage({ content: 'Livro emprestado com sucesso!', severity: 'success' });
        } catch (error) {
          if (isAxiosError(error)) {
            return setMessage({ content: `${error.response?.data.message}`, severity: 'fail' });
          }
          return setMessage({ content: `${error}`, severity: 'fail' });
        }
      }
      return setMessage({
        content: 'A data de retirada não pode ser menor ou igual a data de entrega.',
        severity: 'fail',
      });
    }
    return setMessage({ content: 'Preencha todos os campos!', severity: 'fail' });
  };

  return (
    <ModalContainer id="lent" className="w-8/12" onClose={onClose}>
      <div className="flex-col gap-4 justify-center items-center mt-10 pb-10 px-10">
        <div className="flex flex-col justify-center gap-8">
          <h4 className="font-bold text-font_gray text-xl">Informe os dados do aluno antes de continuar</h4>
          <form data-testid="form-test-id" className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex gap-8">
              <Input large type="text" setValue={setName} label="Nome do Aluno" id="name" />
              <Input large type="text" setValue={setClass} label="Turma" id="class" />
            </div>
            <div className="flex gap-8 mt-10">
              <Input large type="date" setValue={setWithdrawalDate} label="Data da Retirada" id="withdrawalDate" />
              <Input large type="date" setValue={setDeliveryDate} label="Data da Entrega" id="deliveryDate" />
            </div>
            <LentButton className="self-end mt-10" />
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalBookLent;
