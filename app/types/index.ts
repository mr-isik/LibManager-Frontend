export interface User {
  id: number;
  first_name: string;
  second_name: string;
  role: 'admin' | 'user' | 'librarian';
  password: string;
  email: string;
  address: string;
  born: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  author_id: number;
  edition: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Author {
  id: number;
  first_name: string;
  second_name: string;
  bio: string;
  born: Date;
}

export interface Category {
  id: number;
  title: string;
}

export interface BookCategory {
  id: number;
  book_id: number;
  category_id: number;
}

export interface Loan {
  id: number;
  user_id: number;
  book_id: number;
  started_at: Date;
  ended_at: Date;
}

export interface Punishment {
  id: number;
  user_id: number;
  punisher_id: number;
  reason: string;
  duration: Date;
} 