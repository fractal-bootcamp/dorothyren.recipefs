import { Prisma } from "@prisma/client";
import { prisma } from "../server";

export const addNewFileInStorage = async (file: any, recipeId: string) => {
  const { originalname, bucket, key, size, mimetype } = file;
  console.log("newFileInStorage function called with file:", file);

  const newItem = prisma.pictureInS3.create({
    data: {
      name: originalname,
      bucket,
      key,
      size,
      mimetype,
    },
  });
  return newItem;
};
