import React, { useRef } from 'react';
import ModalContainer from '../ModalContainer';
import Button from '../Buttons/DefaultButton';
import axios, { isAxiosError } from 'axios';
import { IBook } from '@/interfaces';
import { useMessageContext } from '@/contexts/messageContext';
import { getCookie } from '@/app/actions';
import { updateBook } from '@/services/book/updatebook';

interface IInactiveProps {
  onClose: () => void;
  book: IBook;
}

const ModalBookInactive = (props: IInactiveProps) => {
  let { book, onClose } = props;
  const inactiveRef = useRef(null);
  const { setMessage } = useMessageContext();

  const inactiveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inactiveRef.current && (inactiveRef.current as HTMLTextAreaElement).value) {
      const payload = {
        isActive: false,
        description: (inactiveRef.current as HTMLTextAreaElement).value,
        id: book.id,
      };
      try {
        await updateBook(payload);
        book.isActive = false;
        book.description = (inactiveRef.current as HTMLTextAreaElement).value;
        onClose();
        return setMessage({
          content: 'Sucesso ao inativar livro!',
          severity: 'success',
        });
      } catch (err) {
        if (isAxiosError(err)) {
          return setMessage({
            content: err.response?.data.error ? err.response?.data.error : err.response?.data.message,
            severity: 'fail',
          });
        }
        setMessage({ content: 'Parece que um ratinho roeu os fios do servidor...', severity: 'fail' });
      }
    }
  };

  const InactiveInput = () => {
    return (
      <div className="group relative flex items-center">
        <textarea
          data-testid="description-input-test-id"
          id="inactive"
          className="peer resize-none h-32 border border-input_color rounded focus:outline-none focus:text-black text-white py-3 pl-2 ease-in duration-100 valid:text-black w-[600px]"
          required
          ref={inactiveRef}
        />
        <label
          htmlFor="inactive"
          className="group-focus-within:text-sm absolute left-2 top-2 group-focus-within:-top-2.5 group-focus-within:bg-white px-1 ease-in duration-75 peer-valid:text-sm peer-valid:bg-white peer-valid:-top-2.5"
        >
          Descrição
        </label>
      </div>
    );
  };

  return (
    <ModalContainer id="inactive" className="w-8/12" onClose={onClose}>
      <div className="flex-col gap-4 justify-center items-center mt-10 pb-10 px-10">
        <form data-testid="form-test-id" className="flex flex-col justify-center gap-8" onSubmit={inactiveHandler}>
          <h4 className="font-bold text-font_gray text-xl">Inativar Livro</h4>
          <InactiveInput />
          <Button
            submit
            title="Inativar"
            className="border-inactive_color justify-self-end text-inactive_color self-end"
          />
        </form>
      </div>
    </ModalContainer>
  );
};

export default ModalBookInactive;
