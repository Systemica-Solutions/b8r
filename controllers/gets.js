import registeredUsersModel from "../models/registeredUser.js";
import AddTenantExportModel from "../models/AddTenant.js";
import AddPropertyExportModel from "../models/PropertyInfo.js";



//GET ALL TENANT USERS
export const getregisteredUserTenant= async (req, res , next) => {
  const agentId = req.userId ;
  console.log(req.userId );

  try {
    const AddTenantExportModelsRes = await AddTenantExportModel.find({ userId : req.userId});
  res.status(200).json(AddTenantExportModelsRes);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//GET ONE REGISTERED USERS
export const getregisteredUserById = async (req, res) => {
  try {
    const getregisteredUserById = await registeredUsersModel.findById(req.params.id);
    res.status(200).json(getregisteredUserById);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Proerty Info
export const getregisteredProperty = async (req, res , next) => {
  const propertyId = req.userId ;
  console.log(req.userId );

  try {
    const AddPropertyExportModelsRes = await AddPropertyExportModel.find({ userId : req.userId});
  res.status(200).json(AddPropertyExportModelsRes);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


// //PROJECTSTITLE GET ALL
// export const getProjects = async (req, res) => {
//   try {
//     const postMessage = await Projects.find();
//     res.status(200).json(postMessage);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

// //GET ONE
// export const getPostById = async (req, res) => {
//   try {
//     const getMessage = await posts.findById(req.params.id);
//     res.status(200).json(getMessage);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

// //DELETE ONE
// export const deletePost = async (req, res) => {
//   console.log(req.params.id);
//   try {
//     const getMessage = await posts.findById(req.params.id);
//     const deleteMessage = await getMessage.delete();
//     res.status(200).json(deleteMessage);
//   } catch (error) {
//     res.status(400).json("ID NOT FOUND", error.message);
//   }
// };

// //UPDATE ONE
// export const updatePost = async (req, res) => {
//   console.log("Title", req.body.title);
//   if (req.body.title != undefined) {
//     try {
//       const getId = posts.findById(req.params.id);
//       const updatedTodo = await posts.findOneAndUpdate(getId, {
//         title: `${req.body.title}`,
//       });
//       res.status(200).json(updatedTodo);
//     } catch (error) {
//       res.status(400).json({ msg: error });
//     }
//   }
//   if (req.body.isCompleted == true) {
//     console.log(req.body.isCompleted);
//     try {
//       const getId = posts.findById(req.params.id);
//       const updatedTodo = await posts.findOneAndUpdate(getId, {
//         isCompleted: `${req.body.isCompleted}`,
//       });
//       res.status(200).json(updatedTodo);
//     } catch (error) {
//       res.status(400).json({ msg: error });
//     }
//   }
// };

// //Delete Project
// export const projectDelete = async (req, res) => {
//   console.log("p", req.params.id);
//   try {
//     const getMessage = await Projects.findById(req.params.id);

//     const deleteMessage = await getMessage.delete();
//     res.status(200).json(deleteMessage);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //lookUp JOIN
// export const joinById = async (req, res) => {
//   //console.log(req.body.posts_id);
//   try {
//     const lookUp = await posts.aggregate([
//       {
//         $lookup: {
//           from: "projects",
//           localField: "p_id",
//           foreignField: "_id",
//           as: "Tododetails",
//         },
//       },
//     ]);
//     res.status(200).json(lookUp);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
