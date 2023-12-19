import React, { SetStateAction, useRef } from 'react';
import ModalContainer from '../ModalContainer';
import Button from '../Buttons/DefaultButton';
import axios, { isAxiosError } from 'axios';
import { IBook } from '@/interfaces';
import { useMessageContext } from '@/contexts/messageContext';
import { getCookie, myFetch } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { deleteBook } from '@/services/book/deleteBook';

interface IDeleteProps {
  onClose: () => void;
  book: IBook;
  books: IBook[];
  setBooks: React.Dispatch<SetStateAction<IBook[] | undefined>>;
}

const ModalBookDelete = (props: IDeleteProps) => {
  let { book, setBooks, onClose, books } = props;
  const { setMessage } = useMessageContext();
  const router = useRouter();

  const inactiveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteBook(book.id);
      setMessage({
        content: 'Sucesso ao deletar livro!',
        severity: 'success',
      });
      onClose();
      const index = books.findIndex(b => b.id === book.id);
      books.splice(index, 1);
      setBooks(books);
      return router.refresh();
    } catch (err) {
      if (isAxiosError(err)) {
        return setMessage({ content: err.response?.data.message, severity: 'fail' });
      }
      setMessage({ content: `Erro no servidor.`, severity: 'fail' });
    }
  };

  return (
    <ModalContainer id="delete" className="w-8/12" onClose={onClose}>
      <div className="flex-col gap-4 justify-center items-center mt-10 pb-10 px-10 z-[9999]">
        <form data-testid="form-test-id" className="flex flex-col justify-center gap-8" onSubmit={inactiveHandler}>
          <h4 className="font-bold text-font_gray text-xl">Deletar {book.title}</h4>
          <span className=" text-gray text-lg">
            Essa ação irá <b className="font-bold text-red">DELETAR</b> este livro permanentemente.
            <br />
            Você não poderá desfazer essa ação.
          </span>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={onClose}
              title="Cancelar"
              className="border-gray justify-self-end text-font_gray self-end"
            />
            <Button submit title="Deletar" className="text-white justify-self-end bg-red self-end" />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default ModalBookDelete;
