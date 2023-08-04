import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';

const AssignedPropertySchema: Schema = new Schema(
  {
    // propertyAgentId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    fieldAgentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    propertyImageId: {
      type: Schema.Types.ObjectId,
      ref: 'PropertyPhotos',
    },
  },
  { timestamps: true }
);

export default model(MODELS.ASSIGNEDPROPERTY, AssignedPropertySchema);
