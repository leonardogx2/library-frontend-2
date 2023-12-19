'use client';
import BookForm from '@/components/BookForm';
import MainContainer from '@/components/MainContainer';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import SkeletonBookForm from '@/components/Skeletons/BookForm';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { IBook } from '@/interfaces';
import { myFetch } from '@/app/actions';
import { axiosFetch } from '@/lib/axios';
import { useMessageContext } from '@/contexts/messageContext';

const Edit = () => {
  const params = useParams();
  const { id } = params;
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const { setMessage } = useMessageContext();

  const getBook = async () => {
    try {
      const res = await axiosFetch.get(`/book/${id}`);
      setBook(res.data);
    } catch (err) {
      setMessage({ content: 'Erro ao encontrar livro.', severity: 'fail' });
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <MainContainer>
      <Breadcrumb backward="Biblioteca" now="Editar livro" to="/books" />
      {book ? <BookForm bookToEdit={book} /> : <SkeletonBookForm />}
    </MainContainer>
  );
};

export default Edit;
