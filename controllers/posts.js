import AddTenantExport from "../models/AddTenant.js";
import PropertyDIex from "../models/PropertyDI.js";
import PropertyInfoExport from "../models/PropertyInfo.js";
import TenantPrefExport from "../models/TenantPref.js";
import registeredUsersModel from "../models/registeredUser.js";
import LandlordInfoExport from "../models/LandlordInfo.js";

export const propertyInfoController = async (req, res, next) => {
  console.log(req.userId);

  const newPosts = new PropertyInfoExport({
    userId: req.userId,
    house_type: req.body.house_type,
    house_conf: req.body.house_conf,
    house_num: req.body.house_num,
    society_type: req.body.society_type,
    pin_code: req.body.pin_code,
    area: req.body.area,
    map: req.body.map,
    rented: req.body.rented,
  });
  try {
    const propertyInfoc = await newPosts.save(newPosts);
    res.status(200).json({ propertyInfoc });
    // alert("User Added Successfully");
    console.log("Property Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};
export const propertyDIcontroller = async (req, res, next) => {
  console.log(req.userId);
  const newPosts = new PropertyDIex({
    userId: req.userId,
    propertyid: req.body.propertyid,
    gated_security: req.body.gated_security,
    twentyfour_seven: req.body.twentyfour_seven,
    grocery_store: req.body.grocery_store,
    Swimming_pool: req.body.Swimming_pool,
    Gym: req.body.Gym,
    club_house: req.body.club_house,
    Super_Carpet: req.body.Super_Carpet,
    Your_Floor: req.body.Your_Floor,
    Total_Floor: req.body.Total_Floor,
    parking: req.body.parking,
    broom: req.body.broom,
    numofbath: req.body.numofbath,
    numofbal: req.body.numofbal,
    furnish: req.body.furnish,
    air_condition: req.body.air_condition,
    nonveg: req.body.nonveg,
    const_year: req.body.const_year,
    avail_from: req.body.avail_from,
    rent: req.body.rent,
    sec_dep: req.body.sec_dep,
    maint: req.body.maint,
    lockin: req.body.lockin,
  });
  try {
    const propertyDIc = await newPosts.save(newPosts);
    res.status(200).json({ propertyDIc });
    // alert("User Added Successfully");
    console.log("Property Details Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const AddTenantController = async (req, res, next) => {
  // const userId = res.userId;
  console.log(req.userId);
  const newPosts = new AddTenantExport({
    userId: req.userId,
    tenant_name: req.body.tenant_name,
    email: req.body.email,
    contact_number: req.body.contact_number,
    house_type: req.body.house_type,
    rent_range: req.body.rent_range,
    society_type: req.body.society_type,
    availability_type: req.body.availability_type,
    isOnBoard: req.body.isOnBoard,
  });
  try {
    // const existingUser = await registeredUsersModel.findOne({ userId });
    const TenantAddedc = await newPosts.save(newPosts);
    //  res.status(200).json({ TentendDetails: TenantAddedc });
    return res.status(200).json({
      tentenddetails: TenantAddedc,
      // userId: userId
    });

    // alert("User Added Successfully");
    console.log("Tenant Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const TenantPrefController = async (req, res, next) => {
  console.log(req.body.availability_type);
  const newPosts = new TenantPrefExport({
    duration_of_stay: req.body.duration_of_stay,
    deposit_comfortable_for: req.body.deposit_comfortable_for,
    house_conf: req.body.house_conf,
    type_of_furnishing: req.body.type_of_furnishing,
    house_type: req.body.house_type,
    movein_from: req.body.movein_from,
    rent: req.body.rent,
  });
  try {
    const TenantPrefc = await newPosts.save(newPosts);
    res.status(200).json({ TenantPrefc });
    // alert("User Added Successfully");
    console.log("Tenant Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }

};

export const LandlordInfoController = async (req, res, next) => {
  console.log(req.userId);
  console.log(req.body.availability_type);
  const newPosts = new LandlordInfoExport({
    userId: req.userId,
    propertyid: req.body.propertyid,
    landlord_first_name: req.body.landlord_first_name,
    landlord_last_name: req.body.landlord_last_name,
    contact_number: req.body.contact_number,
    pan_card: req.body.pan_card,
    residing_country: req.body.residing_country,
  });
  try {
    const LandlordInfoc = await newPosts.save(newPosts);
    res.status(200).json({ LandlordInfoc });
    // alert("User Added Successfully");
    console.log("Landlord Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};


//Add Phtos
// app.post('/backend/file', upload.single('file'), (req, res, next) => {
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