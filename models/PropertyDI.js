import mongoose from "mongoose";
const { Schema } = mongoose;
//schema mongoose
const PropertyDI = new mongoose.Schema({
  rent: {
    type: String,
    required: true,
  },
  maintenance: {
    type: String,
    required: true,
  },
  total_deposit: {
    type: String,
    required: true,
  },
  furnishing_type: {
    type: String,
    required: true,
  },
  total_floors: {
    type: String,
    required: true,
  },
  house_floor_number: {
    type: String,
    required: true,
  },
  carpet_area: {
    type: String,
    required: true,
  },
  num_bedrooms: {
    type: String,
    required: false,
  },
  num_bathrooms: {
    type: String,
    required: false,
  },
  flat_number: {
    type: String,
    required: false,
  },

  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  },
 
});



const PropertyDIex  = mongoose.model("PropertyDIex", PropertyDI);
export default PropertyDIex;


