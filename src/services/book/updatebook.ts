import { IUpdateBookDTO } from '@/interfaces';
import { axiosFetch } from '@/lib/axios';

export async function updateBook(bookData: IUpdateBookDTO) {
  const res = await axiosFetch.put(`/book/${bookData.id}`, bookData);
  return res;
}
