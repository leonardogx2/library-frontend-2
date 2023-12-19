'use server';
import { getCookie, setCookie } from '@/app/actions';
import { redirect } from 'next/navigation';

const logoutUser = async () => {
  setCookie({ name: 'token', value: '' });
  redirect('/auth/login');
};

export { logoutUser };
