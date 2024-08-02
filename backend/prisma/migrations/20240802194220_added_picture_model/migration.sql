-- CreateTable
CREATE TABLE "PictureInS3" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "PictureInS3_pkey" PRIMARY KEY ("id")
);
