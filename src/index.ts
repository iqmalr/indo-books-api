import { Elysia } from "elysia";

import BookRoutes from "./routes/bookRoutes";
import PostRoutes from "./routes/postRoutes";

const app = new Elysia();

app.get("/", () => "Hello Elysia!");

app.group("/api", (app) => {
  app.use(PostRoutes);
  app.use(BookRoutes);
  return app;
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
