/*
  Warnings:

  - You are about to drop the column `spaceID` on the `Task` table. All the data in the column will be lost.
  - Added the required column `requestingSpaceID` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferringSpaceID` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_spaceID_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "spaceID",
ADD COLUMN     "requestingSpaceID" TEXT NOT NULL,
ADD COLUMN     "transferringSpaceID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_requestingSpaceID_fkey" FOREIGN KEY ("requestingSpaceID") REFERENCES "Space"("spaceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_transferringSpaceID_fkey" FOREIGN KEY ("transferringSpaceID") REFERENCES "Space"("spaceID") ON DELETE RESTRICT ON UPDATE CASCADE;
