import { IBook, IRent } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer';
import Image from 'next/image';
import LentButton from '../Buttons/LentButton';
import Button from '../Buttons/DefaultButton';
import { useRouter } from 'next/navigation';
import ActiveButton from '../Buttons/ActiveButton';
import { useMessageContext } from '@/contexts/messageContext';
import { isAxiosError } from 'axios';
import { updateBook } from '@/services/book/updatebook';

interface IModalBookDetails {
  book: IBook;
  onClose: () => void;
  onLentClick: () => void;
  onInactiveClick: () => void;
  onHistoricClick: () => void;
  onDeleteClick: () => void;
}

interface ILentProps {
  rent: IRent;
}

const ModalBookDetails = (props: IModalBookDetails) => {
  const { book, onClose, onLentClick, onHistoricClick, onInactiveClick, onDeleteClick } = props;
  const lastRent = book.rents ? book.rents[book.rents.length - 1] : false;
  const [dateString, setDateString] = useState<string | undefined>();
  const { setMessage } = useMessageContext();
  const router = useRouter();

  useEffect(() => {
    const date = new Date(book.systemEntryDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    setDateString(`${day}/${month}/${year}`);
  }, []);

  const SubItem = ({ title, text }: { title: string; text: string }) => {
    return (
      <div className="gap-4">
        <h4 className="font-bold text-font_gray">{title}</h4>
        <p className="text-font_gray">{text}</p>
      </div>
    );
  };

  const onReturnClick = async () => {
    try {
      await updateBook({ isLent: false, id: book.id });
      book.isLent = false;
      return setMessage({ content: 'Livro devolvido com sucesso!', severity: 'success' });
    } catch (err) {
      if (isAxiosError(err)) {
        return setMessage({
          content: err.response?.data.error ? err.response?.data.error : err.response?.data.message,
          severity: 'fail',
        });
      }
      setMessage({ content: 'Parece que um ratinho roeu os fios do servidor...', severity: 'fail' });
    }
  };

  const LentContainer = (props: ILentProps) => {
    const { rent } = props;
    if (!rent) return;

    const withdrawalDate = new Date(rent.withdrawalDate);
    const deliveryDate = new Date(rent.deliveryDate);

    const withdrawalDateString = `${withdrawalDate.getDate()}/${withdrawalDate.getMonth()}/${withdrawalDate.getFullYear()}`;
    const deliveryDateString = `${deliveryDate.getDate()}/${deliveryDate.getMonth()}/${deliveryDate.getFullYear()}`;

    return (
      <div className="mt-10 text-font_gray w-10/12 mx-auto">
        <h3 className="text-xl font-bold">Dados do aluno</h3>
        <div className="flex bg-light_gray mt-4 justify-between py-4 px-8 mb-10 rounded">
          <div>
            <h4 className="text-md font-bold">Nome do aluno</h4>
            <p className="font-light">{rent.student_name}</p>
          </div>
          <div>
            <h4 className="text-md font-bold">Turma</h4>
            <p className="font-light">{rent.class}</p>
          </div>
          <div>
            <h4 className="text-md font-bold">Data da retirada</h4>
            <p className="font-light">{withdrawalDateString}</p>
          </div>
          <div>
            <h4 className="text-md font-bold">Data da entrega</h4>
            <p className="font-light">{deliveryDateString}</p>
          </div>
        </div>
      </div>
    );
  };

  const InactiveContainer = ({ description }: { description: string }) => {
    return (
      <div className=" text-font_gray w-10/12 mx-auto">
        <h3 className="text-xl font-bold">Informações da inativação</h3>
        <div className="flex flex-col bg-light_gray mt-4 justify-between py-4 px-8 mb-10 rounded">
          <h4 className="text-md font-bold">Motivo</h4>
          <div className="mt-1 font-light">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  };

  const ButtonsContainer = () => {
    return (
      <div className="flex justify-center items-center w-full gap-4 absolute -bottom-20">
        <Button
          onClick={() => router.push(`/books/edit/${book.id}`)}
          title="Editar"
          className="text-edit_color border-edit_color hover:bg-edit_color hover:bg-opacity-20"
        />
        {book.isActive ? (
          <Button
            onClick={onInactiveClick}
            title="Inativar"
            className="text-inactive_color hover:bg-inactive_color hover:bg-opacity-20"
          />
        ) : (
          <ActiveButton book={book} />
        )}
        <Button
          onClick={onHistoricClick}
          title="Histórico"
          className="text-black border-lent hover:bg-lent hover:bg-opacity-20"
        />
        <Button onClick={onDeleteClick} title="Deletar" className="text-red hover:bg-opacity-20 hover:bg-red" />
      </div>
    );
  };

  return (
    <ModalContainer id="details" className="w-8/12" onClose={onClose}>
      <div
        className={`grid grid-cols-modal justify-center mt-20 min-w-[850px] ${
          !book.isActive || !book.isLent ? 'pb-12' : ''
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          <div>
            <Image
              src={book.img}
              width={260}
              height={380}
              className="h-[380px] w-[260px]"
              alt={`${book.title} book image`}
            />
          </div>

          {!book.isLent && !book.isActive ? (
            <LentButton className="mt-3" disabled />
          ) : book.isLent && book.isActive ? (
            <LentButton toReturn onClick={onReturnClick} />
          ) : book.isLent && !book.isActive ? (
            <LentButton toReturn disabled onClick={onReturnClick} />
          ) : (
            <LentButton className="mt-3" onClick={onLentClick} />
          )}
        </div>
        <div>
          <h2 className="text-lg text-center font-bold text-font_gray">{book.title}</h2>
          <div className="mt-8 flex flex-col gap-4 mr-8 relative min-h-[330px]">
            <SubItem title={'Sinopse'} text={book.synopsis} />
            <SubItem title={'Autor'} text={book.author} />
            <SubItem title={'Gênero'} text={book.genre} />
            <SubItem title={'Data de entrada'} text={dateString ?? ''} />
            <ButtonsContainer />
          </div>
        </div>
      </div>
      {!book.isActive ? (
        <InactiveContainer description={book.description ?? ''} />
      ) : book.isLent && lastRent ? (
        <LentContainer rent={lastRent} />
      ) : (
        <></>
      )}
    </ModalContainer>
  );
};

export default ModalBookDetails;
