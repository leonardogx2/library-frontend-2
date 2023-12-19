import BookForm from '@/components/BookForm';
import Breadcrumb from '@/components/Breadcrumb';
import MainContainer from '@/components/MainContainer';
import React from 'react';

const Register = () => {
  return (
    <MainContainer>
      <Breadcrumb backward="Home" now="Cadastrar novo livro" to="/" />
      <BookForm />
    </MainContainer>
  );
};

export default Register;
