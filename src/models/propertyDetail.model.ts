import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  propertyBasicInfo,
  propertyFeatureInfo,
  propertyOwnerInfo,
} from './common.model';

const PropertyDetailSchema: Schema = new Schema(
  {
    propertyInfo: {
      type: propertyBasicInfo,
      default: null,
    },
    ownerInfo: {
      type: propertyOwnerInfo,
      default: null,
    },
    featureInfo: {
      type: propertyFeatureInfo,
      default: null,
    },
    version: {
      type: Schema.Types.Number,
      default: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
  },
  { timestamps: true }
);

export default model(MODELS.PROPERTYDETAILS, PropertyDetailSchema);
