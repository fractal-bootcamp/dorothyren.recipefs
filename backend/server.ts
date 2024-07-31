import cookieParser from "cookie-parser";
import express from "express";

const app = express();
const PORT = 8000;

//middleware function that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
