import { Schema, model } from "mongoose";
import { MODELS } from "../constants/model.constants";

const AssignedPropertySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fieldAgentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    propertyImageId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyPhotos",
    },
  },
  { timestamps: true }
);

export default model(MODELS.ASSIGNEDPROPERTY, AssignedPropertySchema);
