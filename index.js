import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import getRoutes from "./routes/gets.js";
import multer from "multer";


const app = express();

app.use(bodyParser.json());

app.use(cors());
var datetime = new Date();
console.log(datetime.toISOString().split('T')[0]);
const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

//Init Mongo
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})
  .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", true);

app.use((req, res, next)=>{
  console.log(req.method );
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use("/backend/", postRoutes);
app.use("/backend/", getRoutes);


// app.use("/", postGit);

//app.listen(3000);
// simple route
app.get("/backend", (req, res) => {
  res.json({ message: "Welcome to B8r Homes Server!!! The world of API " });
});
app.get("/", (req, res) => {
  res.json({message: "Server is up..."});
})

// post('/backend/file', upload.single('file'), (req, res, next) => {
//   const file = req.file;
//   console.log(file.filename);
//   console.log("Added");
//   if (!file) {
//     const error = new Error('No File')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file);
// })