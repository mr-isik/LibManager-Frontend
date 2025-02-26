import axios from 'axios';
import { Book, User, Category, Loan, Punishment } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth servisleri
export const authService = {
  login: async (email: string, password: string) => {
    // TODO: Login API entegrasyonu
    return api.post('/auth/login', { email, password });
  },
  register: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
    // TODO: Register API entegrasyonu
    return api.post('/auth/register', userData);
  },
  logout: async () => {
    // TODO: Logout API entegrasyonu
    return api.post('/auth/logout');
  },
};

// Kitap servisleri
export const bookService = {
  getAll: async () => {
    // TODO: Kitap listesi API entegrasyonu
    return api.get<Book[]>('/books');
  },
  getById: async (id: number) => {
    // TODO: Tekil kitap API entegrasyonu
    return api.get<Book>(`/books/${id}`);
  },
  create: async (bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    // TODO: Kitap oluşturma API entegrasyonu
    return api.post('/books', bookData);
  },
  update: async (id: number, bookData: Partial<Book>) => {
    // TODO: Kitap güncelleme API entegrasyonu
    return api.put(`/books/${id}`, bookData);
  },
  delete: async (id: number) => {
    // TODO: Kitap silme API entegrasyonu
    return api.delete(`/books/${id}`);
  },
};

// Kullanıcı servisleri
export const userService = {
  getAll: async () => {
    // TODO: Kullanıcı listesi API entegrasyonu
    return api.get<User[]>('/users');
  },
  getById: async (id: number) => {
    // TODO: Tekil kullanıcı API entegrasyonu
    return api.get<User>(`/users/${id}`);
  },
  create: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
    // TODO: Kullanıcı oluşturma API entegrasyonu
    return api.post('/users', userData);
  },
  update: async (id: number, userData: Partial<User>) => {
    // TODO: Kullanıcı güncelleme API entegrasyonu
    return api.put(`/users/${id}`, userData);
  },
  delete: async (id: number) => {
    // TODO: Kullanıcı silme API entegrasyonu
    return api.delete(`/users/${id}`);
  },
};

// Kategori servisleri
export const categoryService = {
  getAll: async () => {
    // TODO: Kategori listesi API entegrasyonu
    return api.get<Category[]>('/categories');
  },
  getById: async (id: number) => {
    // TODO: Tekil kategori API entegrasyonu
    return api.get<Category>(`/categories/${id}`);
  },
  create: async (categoryData: Omit<Category, 'id'>) => {
    // TODO: Kategori oluşturma API entegrasyonu
    return api.post('/categories', categoryData);
  },
  update: async (id: number, categoryData: Partial<Category>) => {
    // TODO: Kategori güncelleme API entegrasyonu
    return api.put(`/categories/${id}`, categoryData);
  },
  delete: async (id: number) => {
    // TODO: Kategori silme API entegrasyonu
    return api.delete(`/categories/${id}`);
  },
};

// Ödünç servisleri
export const loanService = {
  getAll: async () => {
    // TODO: Ödünç listesi API entegrasyonu
    return api.get<Loan[]>('/loans');
  },
  getById: async (id: number) => {
    // TODO: Tekil ödünç API entegrasyonu
    return api.get<Loan>(`/loans/${id}`);
  },
  create: async (loanData: Omit<Loan, 'id'>) => {
    // TODO: Ödünç oluşturma API entegrasyonu
    return api.post('/loans', loanData);
  },
  update: async (id: number, loanData: Partial<Loan>) => {
    // TODO: Ödünç güncelleme API entegrasyonu
    return api.put(`/loans/${id}`, loanData);
  },
  delete: async (id: number) => {
    // TODO: Ödünç silme API entegrasyonu
    return api.delete(`/loans/${id}`);
  },
};

// Ceza servisleri
export const punishmentService = {
  getAll: async () => {
    // TODO: Ceza listesi API entegrasyonu
    return api.get<Punishment[]>('/punishments');
  },
  getById: async (id: number) => {
    // TODO: Tekil ceza API entegrasyonu
    return api.get<Punishment>(`/punishments/${id}`);
  },
  create: async (punishmentData: Omit<Punishment, 'id'>) => {
    // TODO: Ceza oluşturma API entegrasyonu
    return api.post('/punishments', punishmentData);
  },
  update: async (id: number, punishmentData: Partial<Punishment>) => {
    // TODO: Ceza güncelleme API entegrasyonu
    return api.put(`/punishments/${id}`, punishmentData);
  },
  delete: async (id: number) => {
    // TODO: Ceza silme API entegrasyonu
    return api.delete(`/punishments/${id}`);
  },
}; 