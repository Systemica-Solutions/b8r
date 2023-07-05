import mongoose from "mongoose";
const { Schema } = mongoose;
//schema mongoose
const PropertyDI = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  propertyid: {
    type: String,
    required: true,
  },
  gated_security: {
    type: Boolean,
    required: true,
  },
  twentyfour_seven: {
    type: Boolean,
    required: true,
  },
  grocery_store: {
    type: Boolean,
    required: true,
  },
  Swimming_pool: {
    type: Boolean,
    required: true,
  },
  Gym: {
    type: Boolean,
    required: true,
  },
  club_house: {
    type: Boolean,
    required: true,
  },
  Super_Carpet: {
    type: String,
    required: true,
  },
  Your_Floor: {
    type: String,
    required: true,
  },
  Total_Floor: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  broom: {
    type: String,
    required: true,
  },
  numofbath: {
    type: String,
    required: true,
  },
  numofbal: {
    type: String,
    required: false,
  },
  furnish: {
    type: String,
    required: false,
  },
  air_condition: {
    type: Boolean,
    required: true,
  },
  nonveg: {
    type: Boolean,
    required: true,
  },

  const_year: {
    type: String,
    required: false,
  },  
  avail_from: {
    type: String,
    required: false,
  },
  rent: {
    type: String,
    required: false,
  },  
  sec_dep: {
    type: String,
    required: false,
  },  
  maint: {
    type: String,
    required: false,
  },  
  lockin: {
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


