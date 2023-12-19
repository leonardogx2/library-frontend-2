'use client';
import Breadcrumb from '@/components/Breadcrumb';
import MainContainer from '@/components/MainContainer';
import React, { useState, useEffect } from 'react';
import BookItem from '@/components/BookItem';
import SkeletonBookItem from '@/components/Skeletons/BookItem';
import { IBook } from '@/interfaces';
const ModalBookDetails = React.lazy(async () => await import('@/components/ModalBookDetails'));
import ModalBookInactive from '@/components/ModalBookInactive';
import ModalBookHistoric from '@/components/ModalBookHistoric';
import ModalBookLent from '@/components/ModalBookLent';
import SkeletonFilterBookContainer from '@/components/Skeletons/FilterBookContainer';
import { useMessageContext } from '@/contexts/messageContext';
import { useRouter } from 'next/navigation';
import ModalBookDelete from '@/components/ModalBookDelete';
import FilterContainer from '@/components/FilterContainer';
import axios, { isAxiosError } from 'axios';
import { getAllBooks } from '@/services/book/getAllBooks';
import { FaPlug } from 'react-icons/fa';

const Books = () => {
  const [isMainModalOpen, setIsMainModalOpen] = useState<boolean>(false);
  const [isInactiveModalOpen, setIsInactiveModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isHistoricModalOpen, setIsHistoricModalOpen] = useState<boolean>(false);
  const [isLentModalOpen, setIsLentModalOpen] = useState<boolean>(false);
  const [focusBook, setFocusBook] = useState<IBook | undefined>(undefined);
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [haveOtherPage, setHaveOtherPage] = useState<boolean>(true);
  const { setMessage } = useMessageContext();
  const router = useRouter();

  const size = 5;

  // Request
  const onLoad = async () => {
    try {
      const filters = { page, size };
      const allBooks = await getAllBooks(filters);
      const resBooks = allBooks.books;
      const total = allBooks.total;
      if ((books?.length ?? 0) >= total) setHaveOtherPage(false);
      setBooks(resBooks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error.code !== 'ERR_NETWORK') {
          setMessage({ content: error.response?.data.message, severity: 'fail' });
        }
        if (error.response?.status === 401) {
          router.push('/auth/login');
          router.refresh();
          return;
        }
      }
      setLoading(false);
    }
  };

  const onChangePage = async () => {
    const filters = { page, size };
    const allBooks = await getAllBooks(filters);
    const resBooks = allBooks.books;
    const total = allBooks.total;
    if ((books?.length ?? 0) + resBooks.length >= total) setHaveOtherPage(false);
    setBooks(prevBooks => [...(prevBooks ? prevBooks : []), ...resBooks]);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (page !== 1) {
      onChangePage();
    }
  }, [page]);

  function SkeletonBooks() {
    const books = [];

    for (let i = 0; i < 5; i++) {
      books.push(<SkeletonBookItem key={i} />);
    }

    return <>{books}</>;
  }

  const mainModalHandler = (book: IBook) => {
    setFocusBook(book);
    setIsInactiveModalOpen(false);
    setIsHistoricModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsLentModalOpen(false);

    setIsMainModalOpen(true);
  };

  const subModalHandler = (modalType: string) => {
    setIsMainModalOpen(false);

    switch (modalType) {
      case 'inactive':
        setIsInactiveModalOpen(!isInactiveModalOpen);
        break;
      case 'historic':
        setIsHistoricModalOpen(!isHistoricModalOpen);
        break;
      case 'delete':
        setIsDeleteModalOpen(!isDeleteModalOpen);
        break;
      case 'lent':
        setIsLentModalOpen(!isLentModalOpen);
        break;
      default:
        break;
    }
  };

  return (
    <MainContainer>
      <Breadcrumb backward="Home" now="Biblioteca" to="/" />

      {isInactiveModalOpen && focusBook ? (
        <ModalBookInactive book={focusBook} onClose={() => subModalHandler('inactive')} />
      ) : isHistoricModalOpen && focusBook ? (
        <ModalBookHistoric rentHistory={focusBook.rents} onClose={() => subModalHandler('historic')} />
      ) : isDeleteModalOpen && books && focusBook ? (
        <ModalBookDelete
          setBooks={setBooks}
          books={books}
          book={focusBook}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      ) : isLentModalOpen && focusBook !== undefined ? (
        <ModalBookLent book={focusBook} onClose={() => subModalHandler('lent')} />
      ) : isMainModalOpen && focusBook !== undefined ? (
        <ModalBookDetails
          onDeleteClick={() => subModalHandler('delete')}
          onInactiveClick={() => subModalHandler('inactive')}
          onHistoricClick={() => subModalHandler('historic')}
          onLentClick={() => subModalHandler('lent')}
          onClose={() => setIsMainModalOpen(false)}
          book={focusBook}
        />
      ) : (
        <></>
      )}

      <div className="flex flex-col pb-10">
        {!loading ? (
          <FilterContainer
            onLoad={onLoad}
            books={books}
            setBooks={setBooks}
            setPage={setPage}
            setHaveOtherPage={setHaveOtherPage}
          />
        ) : (
          <SkeletonFilterBookContainer />
        )}
        <div className="grid gap-10 grid-cols-5 max-[1250px]:grid-cols-4 max-[800px]:grid-cols-3 max-[638px]:grid-cols-2 max-[440px]:grid-cols-1">
          {books !== undefined ? (
            books.map((book: IBook) => (
              <BookItem
                book={book}
                onClick={() => {
                  mainModalHandler(book);
                }}
                key={book.id}
              />
            ))
          ) : books === undefined && loading ? (
            <SkeletonBooks />
          ) : (
            <div className="absolute bg-slate-200 w-full h-full top-0 left-0 flex items-center justify-center flex-col">
              <FaPlug className="w-8 h-8 text-gray" />
              <p className="font-medium text-gray text-center mt-1">
                O servidor está temporariamente indisponível.
                <br />
                Tente novamente em alguns minutos
              </p>
            </div>
          )}
        </div>
        {haveOtherPage && !loading ? (
          <button
            onClick={() => setPage(page + 1)}
            className="border mx-auto w-[300px] rounded py-2 mt-6 bg-primary font-semibold border-light_gray hover:bg-transparent hover:border-primary duration-100"
          >
            Carregar mais
          </button>
        ) : (
          <></>
        )}
      </div>
    </MainContainer>
  );
};

export default Books;
