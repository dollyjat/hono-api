import { Hono } from "hono";
import { logger } from "hono/logger";
import { getPostMd, getPostMdOne, getPostMeta, getPostMetaOne } from "./fileRead";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/md", async (c) => {
  const data = await getPostMd();
  return c.json(data);
});

app.get("/md/:slug", async (c) => {
  const slug = c.req.param("slug");
  const data = await getPostMdOne(slug);
  return c.json(data);
});

app.get("/meta", async (c) => {
  const { start, end } = c.req.query();

  console.log(start, end);

  const data = await getPostMeta(Number(start), Number(end));
  return c.json(data);
});

app.get("/meta/:slug", async (c) => {
  const slug = c.req.param("slug");
  const data = await getPostMetaOne(slug);
  return c.json(data);
});

export default {
  port: 8081,
  fetch: app.fetch,
};
