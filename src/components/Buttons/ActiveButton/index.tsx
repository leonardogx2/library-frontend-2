import { IBook } from '@/interfaces';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import Button from '../DefaultButton';
import { useMessageContext } from '@/contexts/messageContext';
import { updateBook } from '@/services/book/updatebook';

interface IActiveButton {
  book: IBook;
}

const ActiveButton = (props: IActiveButton) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage } = useMessageContext();
  let { book } = props;
  const activeHandler = async () => {
    setLoading(true);
    const payload = {
      isActive: true,
      description: '',
      id: book.id,
    };
    try {
      await updateBook(payload);
      book.isActive = true;
      return setMessage({ content: 'Livro ativado com sucesso!', severity: 'success' });
    } catch (err) {
      if (isAxiosError(err)) {
        return setMessage({
          content: err.response?.data.error ? err.response?.data.error : err.response?.data.message,
          severity: 'fail',
        });
      }
      setMessage({ content: 'Parece que um ratinho roeu os fios do servidor...', severity: 'fail' });
    }
    setLoading(false);
  };

  return (
    <Button
      onClick={activeHandler}
      title="Ativar"
      loading={loading}
      className="text-active_color hover:bg-active_color hover:bg-opacity-20"
    />
  );
};

export default ActiveButton;
