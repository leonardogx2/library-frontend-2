'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const base_url = 'http://localhost:3333';

export async function login({ email, password }: { email: string; password: string }) {
  const payload = {
    email,
    password,
  };

  try {
    const request = await axios.post(base_url + '/user/auth/login', payload, {});
    const token = request.data?.token;
    if (token) {
      setCookie({ name: 'token', value: token });
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const myFetch = async (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  type?: 'json' | 'file',
  body?: string | FormData,
  revalidate?: number
) => {
  const token = 'Bearer ' + (await getCookie('token'));

  try {
    const response = await fetch(base_url + path, {
      next: revalidate ? { revalidate } : {},
      body,
      method,
      headers: {
        Authorization: token,
        'Access-Control-Allow-Origin': base_url,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': type === 'file' ? 'multipart/form-data' : 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    const res = { error: err };
    return res;
  }
};

export async function setCookie({ name, value }: { name: string; value: string }) {
  cookies().set(name, value);
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}
