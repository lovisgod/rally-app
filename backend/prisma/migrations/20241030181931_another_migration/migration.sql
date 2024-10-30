-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('Active', 'Archived');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Pending', 'Processing', 'Fulfilled');

-- CreateTable
CREATE TABLE "Workspace" (
    "workspaceID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspaceID")
);

-- CreateTable
CREATE TABLE "Space" (
    "spaceID" TEXT NOT NULL,
    "workspaceID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "requestFrom" TEXT,
    "transferTo" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("spaceID")
);

-- CreateTable
CREATE TABLE "RUsers" (
    "userID" TEXT NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "workspaceID" TEXT,

    CONSTRAINT "RUsers_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "UserSpace" (
    "userID" TEXT NOT NULL,
    "spaceID" TEXT NOT NULL,

    CONSTRAINT "UserSpace_pkey" PRIMARY KEY ("userID","spaceID")
);

-- CreateTable
CREATE TABLE "Items" (
    "itemID" TEXT NOT NULL,
    "spaceID" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "uom" VARCHAR(20) NOT NULL,
    "status" "ItemStatus" NOT NULL,
    "sharedWith" TEXT,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskID" TEXT NOT NULL,
    "itemID" TEXT NOT NULL,
    "spaceID" TEXT NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_workspaceID_fkey" FOREIGN KEY ("workspaceID") REFERENCES "Workspace"("workspaceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpace" ADD CONSTRAINT "UserSpace_userID_fkey" FOREIGN KEY ("userID") REFERENCES "RUsers"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpace" ADD CONSTRAINT "UserSpace_spaceID_fkey" FOREIGN KEY ("spaceID") REFERENCES "Space"("spaceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_spaceID_fkey" FOREIGN KEY ("spaceID") REFERENCES "Space"("spaceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("itemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_spaceID_fkey" FOREIGN KEY ("spaceID") REFERENCES "Space"("spaceID") ON DELETE RESTRICT ON UPDATE CASCADE;
