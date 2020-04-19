import express from "express";
import questionRouter from "./routes/questionRouter";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const db = mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-bzr95.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected"))
  .catch(err => console.error(err));
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan("combined")); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

app.use("/api/questions", questionRouter);
// routes go here

app.use(express.static("../client/build")); // Needed for serving production build of React
app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
