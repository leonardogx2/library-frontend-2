'use client';

import Button from '@/components/Buttons/DefaultButton';
import React, { useState } from 'react';
import { login } from '@/app/actions';
import { useRouter } from 'next/navigation';
import logo from '../../../../public/assets/img/Logo.png';
import emailIcon from '../../../../public/assets/img/email-icon.png';
import passwordIcon from '../../../../public/assets/img/password-icon.png';
import Image from 'next/image';
import { useMessageContext } from '@/contexts/messageContext';
import { useAuthContext } from '@/contexts/userContext';

const Login = () => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const { setMessage } = useMessageContext();
  const { signIn } = useAuthContext();
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      const isLogged = await signIn(email, password);
      if (isLogged) {
        router.push('/');
        return window.location.reload();
      }
      return setMessage({ content: 'Credenciais incorretas.', severity: 'fail' });
    }
    setMessage({ content: 'Preencha todos os campos!', severity: 'fail' });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="flex flex-col bg-white p-5 rounded" onSubmit={submitHandler}>
        <div className="relative w-full h-32 flex items-center justify-center pb-5">
          <Image src={logo} alt="Logo image" />
        </div>
        <div className="w-80 flex flex-col gap-4">
          <div className="w-full relative">
            <input
              className="bg-h_gray bg-opacity-60 w-full py-3 pl-3 focus:outline-none rounded"
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
            ></input>
            <Image className="absolute right-3 top-4" src={emailIcon} alt="Email icon" />
          </div>
          <div className="w-full relative">
            <input
              className="bg-h_gray bg-opacity-60 w-full py-3 focus:outline-none rounded pl-3"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Senha"
            ></input>
            <Image className="absolute right-3 top-4" src={passwordIcon} alt="Email icon" />
          </div>
          <span className="text-black underline font-bold text-sm">Esqueci minha senha</span>
          <Button className="w-full bg-primary hover:brightness-105 border-none mt-4" submit title="ENTRAR" />
        </div>
      </form>
    </div>
  );
};

export default Login;
