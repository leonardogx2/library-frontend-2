'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { isAxiosError } from 'axios';
import { setCookie } from '@/app/actions';
import { axiosFetch } from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface IUser {
  name: string;
  email: string;
  password?: string;
  token?: string;
}

interface IAuthContext {
  user: IUser;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: VoidFunction;
  getUser: () => Promise<IUser>;
}

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const router = useRouter();

  async function signIn(email: string, password: string): Promise<boolean> {
    let isSigned = false;

    const payload = {
      email,
      password,
    };

    try {
      const req = await axiosFetch.post('/user/auth/login', payload);
      const { name, email, token } = req.data;

      const user = JSON.stringify({ name, email, token });
      localStorage.setItem('user', user);
      setUser({ name, email, token });
      isSigned = true;
    } catch (err) {
      if (isAxiosError(err)) {
      }
    }

    return isSigned;
  }

  async function signOut() {
    localStorage.setItem('user', '');
    setUser({} as IUser);
    router.push('/auth/login');
    router.refresh();
  }

  async function getUser() {
    const stringUser = localStorage.getItem('user');
    if (stringUser && stringUser !== '') {
      const user = JSON.parse(stringUser);
      setUser(user);
      return user;
    }
    return {};
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getUser,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuthContext };
