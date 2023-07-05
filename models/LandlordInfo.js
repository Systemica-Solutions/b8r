import mongoose from "mongoose";
const { Schema } = mongoose;

//schema mongoose
const LandlordInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  propertyid: {
    type: String,
    required: true,
  },
  landlord_first_name: {
    type: String,
    required: true,
  },
  landlord_last_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  pan_card: {
    type: String,
    required: true,
  },
  residing_country: {
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

