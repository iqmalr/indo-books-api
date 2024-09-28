import { Elysia, t } from "elysia";
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postController";
import { PostData } from "../interfaces/postData";

const PostRoutes = new Elysia({ prefix: "/posts" })
  .get("/", () => getPosts())

  .post("/", ({ body }) => createPost(body as PostData), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 255,
      }),
      content: t.String({
        minLength: 3,
        maxLength: 1000,
      }),
    }),
  })
  .get("/:id", ({ params: { id } }) => getPostById(id))
  .patch('/:id', ({params: { id }, body}) => updatePost(id, body as { title?: string; content?: string }), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 100,
      }),
      content: t.String({
        minLength: 3,
        maxLength: 1000,
      }),
    })
  });
export default PostRoutes;
