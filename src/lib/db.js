import prisma from "@/lib/prisma";
import { tryCatch } from "./utils";

// author
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

export const getAuthors = async (authorName) => {
  const query = authorName
    ? {
        where: {
          name: {
            contains: authorName,
          },
        },
      }
    : {};
  try {
    const authors = await prisma.author.findMany({
      ...query,
      take: 8,
      orderBy: {
        updatedAt: "desc",
      },
    });
    return authors;
  } catch (err) {
    throw err;
  }
};

// post
export const getPosts = async ({
  title = "",
  limit = 2,
  page = 1,
  status = null,
} = {}) => {
  const where = {};
  if (title) {
    where.title = {
      contains: title,
    };
  }

  if (status) {
    where.status = status;
  }

  const [count, countError] = await tryCatch(prisma.post.count({ where }));

  if (countError) throw countError;

  const [data, error] = await tryCatch(
    prisma.post.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        updatedAt: "desc",
      },
    })
  );
  if (error) throw error;
  const totalPages = Math.ceil(count / limit);
  return {
    data,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
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

export const updatePost = async (id, data) => {
  const [postData, error] = await tryCatch(
    prisma.post.update({
      where: {
        id,
      },
      data,
    })
  );
  if (error) throw error;

  return postData;
};

// genre
export const createGenre = async (title) => {
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

export const getGenres = async (genre) => {
  const query = genre
    ? {
        where: {
          title: {
            contains: genre,
          },
        },
      }
    : {};
  const [data, error] = await tryCatch(
    prisma.genre.findMany({
      ...query,
      take: 8,
      orderBy: {
        updatedAt: "desc",
      },
    })
  );
  if (error) throw error;
  return data;
};

export const createQuote = async ({ authorId, postId, quote, color }) => {
  const [data, error] = await tryCatch(
    prisma.quote.create({
      data: {
        authorId,
        postId,
        quote,
        color,
      },
    })
  );
  if (error) throw error;
  return data;
};

export const getQuotes = async ({ id, limit, page } = {}) => {
  const where = {};

  if (id) {
    where.id = parseInt(id);
  }

  const [count, countError] = await tryCatch(
    prisma.quote.count({
      where,
    })
  );

  if (countError) throw countError;

  const [data, error] = await tryCatch(
    prisma.quote.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
      where: { ...where },
      include: {
        author: true,
        post: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    })
  );
  if (error) throw error;

  const totalPages = Math.ceil(count / limit);

  return {
    data,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
};

export const DeleteQuote = async (id) => {
  const [data, error] = await tryCatch(
    prisma.quote.delete({
      where: {
        id,
      },
    })
  );
  if (error) throw error;
  return data;
};

export const updateQuote = async (id, data) => {
  const [quoteData, error] = await tryCatch(
    prisma.quote.update({
      where: {
        id,
      },
      data,
    })
  );
  if (error) throw error;
  return quoteData;
};
