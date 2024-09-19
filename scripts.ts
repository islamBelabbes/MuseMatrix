import prisma from "@/lib/prisma";
import { utapi } from "@/lib/upload-thing";

export const uploadThingGetFileKeyFromUrl = (url: string) => {
  const fileKey = url.split("/f/");
  return fileKey[1];
};

const reMapUploadThingFileKeys = async () => {
  const authors = await prisma.author.findMany({
    select: { avatar: true, id: true },
  });
  const posts = await prisma.post.findMany({
    select: { cover: true, id: true },
  });

  await Promise.all(
    authors.map((author) => {
      return prisma.author.update({
        where: { id: author.id },
        data: { avatar: uploadThingGetFileKeyFromUrl(author.avatar) },
      });
    }),
  );

  await Promise.all(
    posts.map((post) => {
      return prisma.post.update({
        where: { id: post.id },
        data: { cover: uploadThingGetFileKeyFromUrl(post.cover) },
      });
    }),
  );

  console.log("done");
};

const removeUnusedFiles = async () => {
  // get authors media keys
  const authors = await prisma.author.findMany({ select: { avatar: true } });
  const posts = await prisma.post.findMany({ select: { cover: true } });

  const fileKeys = [
    ...authors.map((a) => a.avatar),
    ...posts.map((p) => p.cover),
  ];

  const files = await utapi.listFiles();
  const keys = files.files.map((f) => f.key);

  const unusedKeys = keys.filter((key) => !fileKeys.includes(key));

  await utapi.deleteFiles(unusedKeys);

  console.log("done");
};
