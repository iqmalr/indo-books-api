import prisma from "../../prisma/client";
import { BookData, BookResponse } from "../interfaces/bookData";

export async function getBooks(): Promise<BookResponse> {
  try {
    const books = await prisma.book.findMany({
      orderBy: { publishedAt: "desc" },
    });
    const total = await prisma.book.count();
    return {
      success: true,
      message: "List Data Books!",
      data: books,
   meta: {
        pagination: {
          // page,
          // pageSize,
          // pageCount?,
          total,
        },
      },
    };
  } catch (e: unknown) {
    console.error(`Error getting books: ${e}`);
    return {
      success: false,
      message: "Error getting books.",
      data: null,
    };
  }
}

export async function createBook(options: BookData): Promise<BookResponse> {
  try {
    const {
      title,
      author,
      publisher,
      publishedAt,
      genre,
      language,
      pages,
      isbn,
      summary,
    } = options;
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        publishedAt,
        genre,
        language,
        pages,
        isbn,
        summary,
      },
    });
    return {
      success: true,
      message: "Book Created!",
      data: book,
    };
  } catch (e: unknown) {
    console.error(`Error creating book: ${e}`);
    return {
      success: false,
      message: "Error creating book.",
      data: null,
    };
  }
}

export async function getBookById(id: string): Promise<BookResponse> {
  try {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return {
        success: true,
        message: "Detail Data Book Not Found!",
        data: null,
      };
    }
    return {
      success: true,
      message: `Detail Data Book By ID: ${id}`,
      data: book,
    };
  } catch (e: unknown) {
    console.error(`Error finding book: ${e}`);
    return {
      success: false,
      message: "Error finding book.",
      data: null,
    };
  }
}

export async function updateBook(id: string, data: Partial<BookData>): Promise<BookResponse>{
  try {
        const book = await prisma.book.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return {
      success: true,
      message: "Book Updated!",
      data: book,
    }
  }catch (e: unknown){
    console.error(`Error updating book: ${e}`);
    return {
      success: false,
      message: "Error updating book.",
      data: null,
    };
  }
}

export async function searchBooks(search: string): Promise<BookResponse> {
  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            author: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            publisher: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: { publishedAt: "desc" },
    });

    const total = await prisma.book.count({
      where: {
        OR: [
          {
            author: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            publisher: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return {
      success: true,
      message: `Books with search term: ${search}`,
      data: books,
      meta: {
        pagination: {
          total,
        },
      },
    };
  } catch (e: unknown) {
    console.error(`Error searching books: ${e}`);
    return {
      success: false,
      message: "Error searching books.",
      data: null,
    };
  }
}
