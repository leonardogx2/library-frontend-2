import { ICreateRentDTO } from '@/interfaces';
import { axiosFetch } from '@/lib/axios';

export async function createRent(rentData: ICreateRentDTO) {
  const res = await axiosFetch.post('/rent', rentData);
  return res;
}
