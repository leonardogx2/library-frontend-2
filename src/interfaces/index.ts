export interface IBook {
  title: string;
  author: string;
  genre: string;
  img: string;
  synopsis: string;
  systemEntryDate: Date;
  isActive: boolean;
  isLent: boolean;
  description?: string;
  rents?: IRent[];
  id: string;
}

export interface IRent {
  id?: string;
  book?: IBook;
  bookId: string;
  student_name: string;
  class: string;
  withdrawalDate: string;
  deliveryDate: string;
}

export interface IOption {
  title: string;
  value: string;
}

export interface IUpdateBookDTO {
  id: string;
  img?: string;
  title?: string;
  author?: string;
  genre?: string;
  synopsis?: string;
  systemEntryDate?: Date;
  isActive?: boolean;
  isLent?: boolean;
  description?: string;
}

export interface ICreateBookDTO {
  img: string;
  title: string;
  author: string;
  genre: string;
  synopsis: string;
  systemEntryDate: Date;
}

export interface ICreateRentDTO {
  bookId: string;
  student_name: string;
  class: string;
  withdrawalDate: Date;
  deliveryDate: Date;
}

export interface IRentFilters {
  page: number;
  size: number;
}

export interface IBookFilters {
  page: number;
  size: number;
  title?: string;
}
