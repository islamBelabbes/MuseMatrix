import {  Genre } from "@prisma/client";



export const genresDtoMapper = (genre: Genre) => {
  return {...genre};
};

export type TGenre = ReturnType<typeof genresDtoMapper>;
