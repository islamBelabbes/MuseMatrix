import prisma from "@/lib/prisma";
import { tryCatch } from "./utils";
export const createAuthor = async ({ name, avatar }) => {
  try {
    const author = await prisma.author.create({
      data: {
        name,
        avatar,
      },
    });
    return author;
  } catch (err) {
    throw err;
  }
};

export const getAuthors = async () => {
  try {
    const authors = await prisma.author.findMany();
    return authors;
  } catch (err) {
    throw err;
  }
};

export const createPost = async ({ genre, author, title, cover, content }) => {
  const [data, error] = await tryCatch(
    prisma.post.create({
      data: {
        genreId: parseInt(genre),
        authorId: parseInt(author),
        title,
        cover,
        content,
      },
    })
  );
  if (error) throw error;

  return data;
};

export const createGenre = async ({ title }) => {
  const [data, error] = await tryCatch(
    prisma.genre.create({
      data: {
        title,
      },
    })
  );
  if (error) throw error;
  return data;
};

export const getGenres = async () => {
  const [data, error] = await tryCatch(prisma.genre.findMany());
  if (error) throw error;
  return data;
};
