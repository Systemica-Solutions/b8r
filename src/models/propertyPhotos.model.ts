import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';

const PropertyPhotosSchema: Schema = new Schema(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    photos: [
      {
        type: Schema.Types.String,
      },
    ],
  },
  { timestamps: true }
);

export default model(MODELS.PROPERTYPHOTOS, PropertyPhotosSchema);
