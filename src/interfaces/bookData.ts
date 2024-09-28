import { Book } from "@prisma/client";

export interface BookData {
  id:string;
  title: string;
  author: string;
  publisher: string;
  publishedAt: Date;
  genre: string;
  language: string;
  pages: number;
  isbn: string;
  summary: string;
}

export interface PaginationMeta {
  pagination: {
    // page: number;
    // pageSize: number;
    // pageCount: number;
    total: number;
  };
}

export interface BookResponse {
  success: boolean;
  message: string;
  data: Book[] | Book | null;
  meta?: PaginationMeta;
}