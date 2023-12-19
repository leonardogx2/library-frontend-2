import { IBookFilters } from '@/interfaces';
import { axiosFetch } from '@/lib/axios';

export async function getAllBooks(filters: IBookFilters) {
  const res = await axiosFetch.get('/book', {
    params: { ...filters },
  });

  return res.data;
}
