import React, { SetStateAction, useEffect, useState } from 'react';
import Select from '../Inputs/CustomSelect/Select';
import Image from 'next/image';
import { IBook } from '@/interfaces';
import { myFetch } from '@/app/actions';
import { useMessageContext } from '@/contexts/messageContext';
import { getAllBooks } from '@/services/book/getAllBooks';

interface IFilterContainer {
  setBooks: React.Dispatch<SetStateAction<IBook[] | undefined>>;
  setPage: React.Dispatch<SetStateAction<number>>;
  setHaveOtherPage: React.Dispatch<SetStateAction<boolean>>;
  books: undefined | IBook[];
  onLoad: () => void;
}

const FilterContainer = (props: IFilterContainer) => {
  const { books, setBooks, onLoad, setPage, setHaveOtherPage } = props;
  const [search, setSearch] = useState<string>('');
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>('');
  const { setMessage } = useMessageContext();
  const options = [
    { title: 'Título', value: 'title' },
    { title: 'Gênero', value: 'genre' },
    { title: 'Autor', value: 'author' },
    { title: 'Data de entrada', value: 'entryDate' },
  ];

  const filterHandler = () => {
    if (filterBy !== '') {
      const filter = options.find(option => option.title === filterBy)?.value;
      if (books) {
        let sortedBooks;
        if (filter !== 'entryDate') {
          sortedBooks = [...books].sort((a, b) => compareByKey(a, b, filter as IKey));
        } else {
          sortedBooks = [...books].sort(compareBySystemEntryDate);
        }
        setBooks(sortedBooks);
      }
    }
  };
  useEffect(filterHandler, [filterBy]);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (books && e.target.value !== '') {
      try {
        setPage(1);
        const regex = new RegExp(e.target.value.trim(), 'i');
        const filters = { page: 1, size: 5, title: e.target.value.trim() };
        const filteredBooks = await getAllBooks(filters);
        setBooks(filteredBooks);
      } catch (err) {
        setMessage({ content: 'Erro ao pesquisar livros...', severity: 'fail' });
      }
    } else if (e.target.value === '' || e.target.value === undefined) {
      setHaveOtherPage(true);
      onLoad();
    }
  };

  return (
    <form
      data-testid="filter-container-test-id"
      onSubmit={e => e.preventDefault()}
      className="h-52 w-full flex flex-col sm:flex-row items-center justify-center gap-8 mt-8"
    >
      <div className="flex items-center rounded border border-lent h-14 relative pr-2 min-[900px]:w-[550px] min-[730px]:w-[400px] w-[300px]">
        <Image
          className="absolute left-3"
          src={'/assets/img/search-icon.png'}
          width={18}
          height={18}
          alt="search icon"
        />
        <input
          data-testid="search-test-id"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            searchHandler(e);
          }}
          className="ml-10 italic focus:outline-none w-full"
          placeholder="Pesquisar livro..."
          value={search}
        ></input>
        <button
          onClick={() => {}}
          className="bg-primary font-bold rounded p-2 px-4 duration-100 hover:scale-105 hover:bg-opacity-80"
        >
          Buscar
        </button>
      </div>
      <Select
        label="Filtrar"
        small
        value={filterBy}
        setValue={setFilterBy}
        isSelectOpen={isSelectOpen}
        selectHandler={() => {
          setIsSelectOpen(!isSelectOpen);
          filterHandler();
        }}
        options={options}
        className={'border-lent'}
        id="filtrar"
      />
    </form>
  );
};

export default FilterContainer;

type IKey = 'author' | 'genre' | 'title';

function compareByKey(a: IBook, b: IBook, key: IKey) {
  console.log('entrei');
  const keyA = a[key].toLowerCase();
  const keyB = b[key].toLowerCase();

  if (keyA < keyB) {
    return -1;
  } else if (keyA > keyB) {
    return 1;
  } else {
    return 0;
  }
}

function compareBySystemEntryDate(a: IBook, b: IBook) {
  const keyA = a.systemEntryDate;
  const keyB = b.systemEntryDate;

  if (keyA < keyB) {
    return -1;
  } else if (keyA > keyB) {
    return 1;
  } else {
    return 0;
  }
}
