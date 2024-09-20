/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('Draft', 'Published');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sourceId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "sourceId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'Draft',
ALTER COLUMN "cover" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Source";

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "postId" INTEGER,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
