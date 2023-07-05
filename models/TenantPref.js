import mongoose from "mongoose";
import AddTenant from "../models/AddTenant.js";

const { Schema } = mongoose;

//schema mongoose
const TenantPref = new mongoose.Schema({

  duration_of_stay: {
    type: String,
    required: true,
  },
  deposit_comfortable_for: {
    type: String,
    required: true,
  },
  house_conf:{
    type:String,
    required:true,
  },
  type_of_furnishing: {
    type: String,
    required: true,
  },
  house_type: {
    type: String,
    required: true,
  },
  movein_from: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },

  PropertyParent: [{ type: Schema.Types.ObjectId, ref: 'Event' }],

 
  // p_id: { type: String, ref: "Projects" },

  // owner: { type: String, ref: "postsgit" },
 
});


// var Event  = mongoose.model('Event', AddTenant);

const TenantPrefExport  = mongoose.model("TenantPref", TenantPref);
export default TenantPrefExport;

