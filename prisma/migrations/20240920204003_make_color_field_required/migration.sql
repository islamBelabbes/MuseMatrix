/*
  Warnings:

  - Made the column `color` on table `Quote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "color" SET NOT NULL;
