import mongoose from "mongoose";
const { Schema } = mongoose;
var datetime = new Date();

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = year + "/" + month + "/" + day;

//schema mongoose
const PropertyInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  property_name: {
    type: String,
    required: true,
  },
  society_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  area_name: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  pin_code: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  rented: {
    type: Boolean,
    required: false,
  },
  createdDate: {
    type: String,
    required: true,
    default: () => newdate,

    
  },
 
  // createdDate: {
  //   type: Date,
  //   required: true,
  //   default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  // },

  // p_id: { type: String, ref: "Projects" },

  // owner: { type: String, ref: "postsgit" },
});

// const ProjectSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//   },
//   ProjectTitle: {
//     type: String,
//     required: true,
//   },
//   createdDate: {
//     type: Date,
//     required: true,
//     default: () => Date.now() + 5.5 * 60 * 60 * 1000,
//     //IST
//   },

//   posts_id: { type: String, ref: "Posts" },
//   owner: { type: String, ref: "postsgit" },
// });

const PropertyInfoExport  = mongoose.model("PropertyInfoExport", PropertyInfo);
export default PropertyInfoExport;

// export const Projects = mongoose.model("Projects", ProjectSchema);
// export common  Projects;
//module.exports  = mongoose.model('posts', postSchema)
