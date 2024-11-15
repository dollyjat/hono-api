import matter from "gray-matter";
import { Glob } from "bun";

interface dataPost {
  content: string;
}

interface postMeta {
  title: string;
  slug: string;
  tags: string[];
  description: string;
}

const glob = new Glob("data/posts/*.md");

export const getPostMeta = async (start: number, end: number) => {
  let postMetas: postMeta[] = [];

  for (const file of glob.scanSync(".")) {
    const text = await Bun.file(file).text();
    const { data, content } = matter(text);

    postMetas.push(data as postMeta);
  }

  const postMetaGet = postMetas.slice(start, end);

  return postMetaGet;
};

export const getPostMetaOne = async (slug: string) => {
  let post_meta: postMeta = {
    title: "",
    slug: "",
    tags: [],
    description: "",
  };

  const text = await Bun.file(`data/posts/${slug}.md`).text();
  const { data, content } = matter(text);

  post_meta = data as postMeta;

  return post_meta;
};

export const getPostMd = async () => {
  const postMd: dataPost[] = [];

  for (const file of glob.scanSync(".")) {
    const text = await Bun.file(file).text();
    const { data: meta, content } = matter(text);

    postMd.push({
      content: content,
    });
  }

  return postMd;
};

export const getPostMdOne = async (slug: string) => {
  const postMd: dataPost = {
    content: "",
  };

  const text = await Bun.file(`data/posts/${slug}.md`).text();
  const { data: meta, content } = matter(text);

  postMd.content = content;

  return postMd;
};
