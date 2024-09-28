import { Elysia, t } from "elysia";
import {
  createBook,
  getBookById,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/bookController";
import { BookData } from "../interfaces/bookData";

const BookRoutes = new Elysia({ prefix: "/books" })
  .get("/", () => getBooks())
  .post("/", ({ body }: { body: unknown }) => createBook(body as BookData), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 255,
      }),
      author: t.String({
        minLength: 3,
        maxLength: 255,
      }),
      publisher: t.String({
        minLength: 3,
        maxLength: 255,
      }),
      publishedAt: t.String(),
      genre: t.String({
        minLength: 3,
        maxLength: 100,
      }),
      language: t.String({
        minLength: 2,
        maxLength: 50,
      }),
      pages: t.Number({
        minimum: 1,
      }),
      isbn: t.String({
        minLength: 10,
        maxLength: 13,
      }),
      summary: t.String({
        maxLength: 1000,
      }),
      //   rate: t.Number({
      //     minimum: 0,
      //   }),
    }) as any,
  })
  .get("/:id", ({ params: { id } }) => getBookById(id))
  .patch("/:id", ({ params: { id }, body }) => updateBook(id, body as Partial<BookData>), {
    body: t.Object({
      title: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 255,
        })
      ),
      author: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 255,
        })
      ),
      publisher: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 255,
        })
      ),
      publishedAt: t.Optional(t.String()),
      genre: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 100,
        })
      ),
      language: t.Optional(
        t.String({
          minLength: 2,
          maxLength: 50,
        })
      ),
      pages: t.Optional(
        t.Number({
          minimum: 1,
        })
      ),
      isbn: t.Optional(
        t.String({
          minLength: 10,
          maxLength: 13,
        })
      ),
      summary: t.Optional(
        t.String({
          maxLength: 1000,
        })
      ),
    }),
  })

  .get("/search", ({ query }) => {
    const search = query.search as string;
    return searchBooks(search);
  });


export default BookRoutes;
