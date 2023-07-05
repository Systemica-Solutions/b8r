import mongoose from "mongoose";
const { Schema } = mongoose;
//schema mongoose
const addPhotos = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  },
 
});



const addPhotosUpload  = mongoose.model("addPhotosUpload", addPhotos);
export default addPhotosUpload;


