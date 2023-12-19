import { IRentFilters } from '@/interfaces';
import { axiosFetch } from '@/lib/axios';

export async function getAllRents(filters: IRentFilters) {
  const res = await axiosFetch.get('/rent', { params: { ...filters } });
  return res.data;
}
