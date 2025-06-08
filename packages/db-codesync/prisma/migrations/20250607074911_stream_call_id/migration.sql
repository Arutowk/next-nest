/*
  Warnings:

  - A unique constraint covering the columns `[streamCallId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.
  - Made the column `streamCallId` on table `Interview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "streamCallId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interview_streamCallId_key" ON "Interview"("streamCallId");
