/*
  Warnings:

  - You are about to drop the column `author` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
