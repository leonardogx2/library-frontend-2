import { axiosFetch } from '@/lib/axios';

export async function deleteBook(bookId: string) {
  await axiosFetch.delete(`/book/${bookId}`);
}
