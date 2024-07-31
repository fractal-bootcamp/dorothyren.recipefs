import cookieParser from "cookie-parser";
import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

//middleware function that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//at /recipefeed, GET all art
app.get("/recipefeed", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc", //returns the most recent first
      },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).send("Error fetching recipes");
  }
});

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
