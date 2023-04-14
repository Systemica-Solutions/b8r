import mongoose from "mongoose";
const { Schema } = mongoose;

//schema mongoose
const LandlordInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  landlord_name: {
    type: String,
    required: true,
  },
  landlord_pan_card: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  residing_country: {
    type: String,
    required: true,
  },
  residing_city: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  },
  
});



const LandlordInfoExport  = mongoose.model("LandlordInfoExport", LandlordInfo);
export default LandlordInfoExport;

