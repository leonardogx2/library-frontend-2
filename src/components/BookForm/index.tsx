'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { IBook } from '@/interfaces';
import InputRef from '../Inputs/Input';
import TextareaRef from '../Inputs/Textarea';
import Select from '../Inputs/CustomSelect/Select';
import ImageInput from '../Inputs/ImageInput';
import Button from '../Buttons/DefaultButton';
import { useRouter, useParams } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useMessageContext } from '@/contexts/messageContext';
import { createBook } from '@/services/book/createBook';
import { updateBook } from '@/services/book/updatebook';
import { useAuthContext } from '@/contexts/userContext';

interface BookFormProps {
  bookToEdit?: IBook;
}

const BookForm = (props: BookFormProps) => {
  let { bookToEdit } = props;
  const { id } = useParams();
  const router = useRouter();
  const { setMessage } = useMessageContext();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [synopsis, setSynopsis] = useState<string | undefined>(undefined);
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [systemEntryDate, setSystemEntryDate] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const { getUser } = useAuthContext();

  useEffect(() => {
    verifyLogin();
    if (location.pathname.includes('/edit') && bookToEdit) {
      setTitle(bookToEdit.title);
      setSynopsis(bookToEdit.synopsis);
      setImageFile(bookToEdit.img);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);

      const date = new Date(bookToEdit.systemEntryDate);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      setSystemEntryDate(`${year}-${month}-${day}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyLogin = async () => {
    const user = await getUser();
    if (!user.email) {
      router.push('/auth/login');
      router.refresh();
      return;
    }
    setIsLogged(true);
  };

  const genreOptions = [
    { title: 'Fantasia', value: 'fantasy' },
    { title: 'Ação e Aventura', value: 'action_and_adventure' },
    { title: 'Horror', value: 'horror' },
    { title: 'Romance', value: 'romance' },
  ];

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e2: any) {
        if (e.target.files && e.target.files[0]) {
          const imageName = e.target.files[0].name;
          setImageFile(e2.target.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!author || !title || !systemEntryDate || !genre || !synopsis || !imageFile)
      return setMessage({ content: 'Preencha todos os campos!', severity: 'fail' });

    const formattedSystemEntryDate = new Date(systemEntryDate);

    const payload = {
      title,
      author,
      systemEntryDate: formattedSystemEntryDate,
      genre,
      synopsis,
      img: imageFile,
    };

    try {
      if (!window.location.pathname.includes('edit')) {
        await createBook(payload);
      } else {
        await updateBook({ ...payload, id: id as string });
      }

      setMessage({
        content: `Livro ${window.location.pathname.includes('edit') ? 'editado' : 'registrado'} com sucesso!`,
        severity: 'success',
      });
      return router.back();
    } catch (err) {
      if (isAxiosError(err)) {
        return setMessage({ content: err.response?.data.message, severity: 'fail' });
      }
      setMessage({ content: 'Erro no servidor', severity: 'fail' });
    }
  };

  if (!isLogged) return <></>;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div id="form1" className="flex max-[930px]:flex-col gap-10 mt-20">
        <ImageInput preview={imageFile ? imageFile : undefined} handler={imageHandler} />
        <div className="flex gap-6 max-[720px]:flex-col">
          <div className="flex flex-col h-40 justify-between">
            <InputRef setValue={setTitle} value={title} label="Título" id="title" />
            <TextareaRef value={synopsis} setValue={setSynopsis} label="Sinopse" id="synopsis" />
          </div>
          <div className="flex flex-col h-44 gap-10">
            <span className="max-[720px]:mt-4 max-[720px]:visible hidden"></span>
            <InputRef setValue={setAuthor} value={author} label="Autor" id="author" />
            <Select
              label="Gênero"
              value={genre}
              setValue={setGenre}
              isSelectOpen={isSelectOpen}
              selectHandler={() => setIsSelectOpen(!isSelectOpen)}
              options={genreOptions}
              defaultValue={genre ? genre : undefined}
              id="genre"
            />
            <InputRef
              type="date"
              setValue={setSystemEntryDate}
              value={systemEntryDate}
              label="Data de entrada"
              id="systemEntryDate"
            />
          </div>
        </div>
      </div>
      <div className="self-end flex gap-6 max-[930px]:mt-4 max-[720px]:mt-20 max-[720px]:self-center">
        <Button
          title="Cancelar"
          className="border-red text-black px-6 uppercase"
          onClick={() => {
            router.back();
          }}
        />
        <Button
          title="Salvar"
          submit
          className="bg-primary text-black border-primary px-8 uppercase"
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default BookForm;
