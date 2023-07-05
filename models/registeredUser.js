import mongoose from "mongoose";
const { Schema } = mongoose;
//schema mongoose
const registeredUsers = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  c_password: {
    type: String,
    required: false,
  },
  icode: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  
 
  


  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  },

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

const registeredUsersExport = mongoose.model("registeredUsers", registeredUsers);
export default registeredUsersExport;

// export const Projects = mongoose.model("Projects", ProjectSchema);
// export common  Projects;
//module.exports  = mongoose.model('posts', postSchema)
