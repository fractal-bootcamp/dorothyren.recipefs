import cookieParser from "cookie-parser";
import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import optionalUser from "./middleware/auth";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

//middleware function that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(ClerkExpressRequireAuth());
//this is the clerk middleware we wrote for auth
app.use(optionalUser);

//at /recipefeed, GET all recipes
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

//POST route at /createuser, to create a user
app.post("/createuser", async (req, res) => {
  const newUser = req.user;
  // if (!email || !clerkId) {
  //   return res.status(400).json({ error: "User information is missing" });
  // }
  // try {
  //   const existingUser = await prisma.users.findUnique({
  //     where: { clerkId: clerkId },
  //   });
  //   if (existingUser) {
  //     return res.status(409).json({ error: "User already exists" });
  //   }
  //   // Create a new user in the database
  //   const newUser = await prisma.users.create({
  //     data: {
  //       email: email,
  //       clerkId: clerkId,
  //     },
  //   });

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).send("Error creating user");
  }
});

//POST route to create a new recipe
app.post(
  "/createrecipe",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).send("Unauthorized");
      }

      // Create a new recipe
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          description,
          userId: req.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).send("Error creating recipe");
    }
  }
);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
