import cookieParser from "cookie-parser";
import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
  clerkClient,
} from "@clerk/clerk-sdk-node";
import optionalUser from "./middleware/auth";
import { S3 } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

const s3 = new S3({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

// const testUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "dorothy-bucket-example",
//     metadata: function (req, file, callback) {
//       callback(null, { fieldName: file.fieldName });
//     },
//     key: function (req, file, callback) {
//       callback(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
// });

//middleware function that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(ClerkExpressRequireAuth());
//this is the clerk middleware we wrote for auth
app.use(optionalUser);

//testing route to S3
app.get("/test", async (req, res) => {
  const data = await s3.listBuckets();

  res.send({ buckets: data });
});

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
    res.status(500).json({ message: "Error creating user" });
  }
});

//POST route to create a new recipe
app.post(
  "/createrecipe",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const { id } = req.params;
    console.log("HELP", req.body);
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
      console.error(error);
      res.status(500).json({ message: "Error creating recipe" });
    }
  }
);

app.post("/upload", upload.single("image"), (req, res) => {
  debugger;
  console.log("file: ", req.file);
  const formData = req.body;
  console.log("form data:", formData);
  res.status(200).send("Form data received");
});

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
