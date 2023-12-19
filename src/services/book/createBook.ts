import { ICreateBookDTO } from '@/interfaces';
import { axiosFetch } from '@/lib/axios';

export async function createBook(bookData: ICreateBookDTO) {
  const res = await axiosFetch.post('/book', bookData);
  return res;
}
