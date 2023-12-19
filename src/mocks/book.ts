import { IBook } from '@/interfaces';

export const mockBook: IBook = {
  id: 'book-id',
  title: 'Mock book',
  genre: 'Ação e Aventura',
  author: 'Leonardo',
  img: 'https://www.infomoney.com.br/wp-content/uploads/2022/04/psicologia-financieira.png?fit=1200%2C630&quality=50&strip=all',
  systemEntryDate: new Date(),
  synopsis: 'Lorem',
  isActive: true,
  isLent: false,
  description: '',
};
