import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
  clerkClient,
} from "@clerk/clerk-sdk-node";
import optionalUser from "./middleware/auth";
import { S3, _Error } from "@aws-sdk/client-s3";
import multer, { Multer } from "multer";
import multerS3 from "multer-s3";
import { addNewFileInStorage } from "./utils/dbFunctions";

interface MulterRequest extends Request {
  file?: any;
}

export const prisma = new PrismaClient();
const app = express();
const PORT = 8000;
const bucketName = "dorothy-bucket-example";
const region = "us-east-2";

const s3 = new S3({
  region: region,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

const testUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, callback) {
      callback(null, { fieldName: file.fieldName });
    },
    key: function (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

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
  console.log("GET endpoint called at /test");
  const data = await s3.listBuckets();
  if (data) {
    console.log("Response from AWS successfully recorded.");
  }
  console.log("data object is: ", data);
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
// app.post("/createuser", async (req, res) => {
//   const newUser = req.user;

//   if (newUser) {
//     res.status(201).json(newUser);
//   } else {
//     res.status(500).json({ message: "Error creating user" });
//   }
// });

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
      // if (!req || !req.user) {
      //   return res.status(401).send("Unauthorized");
      // }

      // Create a new recipe
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          description,
          userId: "123",
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

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log("file: ", req.file);
//   const formData = req.body;
//   console.log("form data:", formData);
//   res.status(200).send("Form data received");
// });

app.post(
  "/upload",
  testUpload.single("image"),
  async (req: MulterRequest, res: Response) => {
    if (req.file) {
      console.log("attempting to send to db");
      const newItem = await addNewFileInStorage(
        req.file,
        "insert recipe id here"
      );
    } else {
      console.log("unsuccessful upload");
    }
  }
);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
