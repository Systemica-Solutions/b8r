import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import getRoutes from "./routes/gets.js";


const app = express();

app.use(bodyParser.json());

app.use(cors());

var datetime = new Date();
console.log(datetime.toISOString().split('T')[0]);
const CONNECTION_URL =
  "mongodb+srv://b8r:homes@cluster0.sbfwcs4.mongodb.net/b8r?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//Init Mongo
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", true);

app.use((req, res, next)=>{
  console.log(req.method );
  next();
});


app.use("/", postRoutes);
app.use("/", getRoutes);


// app.use("/", postGit);

//app.listen(3000);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to B8r Homes Server!!! The world of API " });
});