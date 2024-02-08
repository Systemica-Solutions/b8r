import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  propertyApproveInfo,
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
    approveInfo: {
      type: propertyApproveInfo,
      default: null
    },
    version: {
      type: Schema.Types.Number,
      default: 1,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.AGENT,
    },
  },
  { timestamps: true }
);

export default model(MODELS.PROPERTYDETAILS, PropertyDetailSchema);
