import AddTenantExportModel from "../models/AddTenant.js";
import AddPropertyExportModel from "../models/PropertyInfo.js";
import bcrypt from "bcrypt";
import registeredUsersModel from "../models/registeredUser.js";
import PropertyDIex from "../models/PropertyDI.js";



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


//UPDATE ONE
export const updatePassword = async (req, res) => {
  console.log("password", req.body.phone);
  console.log("password", req.body.c_password);
  // console.log("phone", req.params.phone);
  const { phone, c_password, password } = req.body;
  if (req.body.password != undefined) {
  // console.log("phone", req.body.phone);

      //Hasing Password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // console.log(hashedPassword);
    try {
      
      // const options = { new: true };
      // const getId = await registeredUsersModel.findOne({ phone });
      // // console.log(getId)
      // const updatedUser = await registeredUsersModel.findOneAndUpdate(getId, {
      //   password: hashedPassword,
      //   c_password: hashedPassword,
      // });
      // res.status(200).json(updatedUser);
      const filter = { phone };
      const update = { password: hashedPassword, c_password: hashedPassword };
      const options = { new: true };
      const updatedUser = await registeredUsersModel.findOneAndUpdate(filter, update, options);
      res.status(200).json(updatedUser);

    } 
    
    
    catch (error) {
      res.status(400).json({ msg: error });
    }
  }




  // if (req.body.isCompleted == true) {
  //   console.log(req.body.isCompleted);
  //   try {
  //     const getId = posts.findById(req.params.id);
  //     const updatedTodo = await posts.findOneAndUpdate(getId, {
  //       isCompleted: `${req.body.isCompleted}`,
  //     });
  //     res.status(200).json(updatedTodo);
  //   } catch (error) {
  //     res.status(400).json({ msg: error });
  //   }
  // }
};


//GET ONE REGISTERED USERS
export const getpropertyInfoById = async (req, res) => {
  console.log(req.params.ids);
  try {
    const getpropertyInfoById = await AddPropertyExportModel.findById( req.params.id );
    const getpropertyDIById = await PropertyDIex.find({ propertyid : req.params.id});
    res.status(200).json( {getpropertyInfoById, getpropertyDIById});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//lookUp JOIN -- PROPERTY CREATED
export const joinPropertyCreated = async (req, res) => {
  console.log(PropertyDIex.propertyId);
  console.log(AddPropertyExportModel);
  try {
    const lookUp = await PropertyDIex.aggregate([
      {
        $lookup: {
          from: "PropertyInfoExports",
          localField: "propertyId",
          foreignField: "_id",
          as: "joinPropertyCreated",
        },
      },
    ]);
    res.status(200).json(lookUp);
  } catch (error) {
    res.status(400).json(error);
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
