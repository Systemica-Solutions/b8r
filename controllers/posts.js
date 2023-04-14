
import AddTenantExport from "../models/AddTenant.js";
import PropertyDIex from "../models/propertyDI.js";
import PropertyInfoExport from "../models/PropertyInfo.js";
import TenantPrefExport from "../models/TenantPref.js";
import registeredUsersModel from "../models/registeredUser.js";
import LandlordInfoExport from "../models/LandlordInfo.js";




export const propertyInfoController = async (req, res, next) => {
  console.log(req.userId );

  const newPosts = new PropertyInfoExport({
    userId :req.userId,
    property_name: req.body.property_name,
    society_name: req.body.society_name,
    location: req.body.location,
    area_name: req.body.area_name,
    property_type: req.body.property_type,
    pin_code: req.body.pin_code,
    address: req.body.address,
    city: req.body.city,
    rented: req.body.rented,
    
  });
  try {
    const propertyInfoc = await newPosts.save(newPosts);
    res.status(200).json({ propertyInfoc});
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
    rent: req.body.rent,
    maintenance: req.body.maintenance,
    total_deposit: req.body.total_deposit,
    furnishing_type: req.body.furnishing_type,
    total_floors: req.body.total_floors,
    house_floor_number: req.body.house_floor_number,
    carpet_area: req.body.carpet_area,
    num_bedrooms: req.body.num_bedrooms,
    num_bathrooms: req.body.num_bathrooms,
    flat_number: req.body.flat_number,
    
  });
  try {
    const propertyDIc = await newPosts.save(newPosts);
    res.status(200).json({ propertyDIc});
    // alert("User Added Successfully");
    console.log("Property Details Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const AddTenantController = async (req, res, next) => {
  // const userId = res.userId;
  console.log(req.userId );
  const newPosts = new AddTenantExport({
    userId :req.userId,
    tenant_name: req.body.tenant_name,
    email: req.body.email,
    contact_number: req.body.contact_number,
    house_type: req.body.house_type,
    rent_range: req.body.rent_range,
    society_type: req.body.society_type,
    availability_type: req.body.availability_type,
    isOnBoard : req.body.isOnBoard

    
  });


  try {

    // const existingUser = await registeredUsersModel.findOne({ userId });

    const TenantAddedc = await newPosts.save(newPosts);
    //  res.status(200).json({ TentendDetails: TenantAddedc });
      return res
      .status(200)
      .json({
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
    type_of_furnishing: req.body.type_of_furnishing,
   
    
    
  });
  try {
    const TenantPrefc = await newPosts.save(newPosts);
    res.status(200).json({ TenantPrefc});
    // alert("User Added Successfully");
    console.log("Tenant Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const LandlordInfoController = async (req, res, next) => {
  console.log(req.userId );

  console.log(req.body.availability_type);
  const newPosts = new LandlordInfoExport({
    userId :req.userId,
    landlord_name: req.body.landlord_name,
    landlord_pan_card: req.body.landlord_pan_card,
    email: req.body.email,
    contact_number: req.body.contact_number,
    residing_country: req.body.residing_country,
    residing_city: req.body.residing_city,
   
    
    
  });
  try {
    const LandlordInfoc = await newPosts.save(newPosts);
    res.status(200).json({LandlordInfoc});
    // alert("User Added Successfully");
    console.log("Landlord Added Successfully");
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};


