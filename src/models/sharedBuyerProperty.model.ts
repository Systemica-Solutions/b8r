import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';

export const sharedBuyerPropertyInfo: Schema = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.BUYER,
    },
    viewedAt: {
      type: Schema.Types.Date,
      default: null,
    },
    isShortlisted: {
      type: Schema.Types.Boolean,
      default: false,
    },
    shortlistedProperties: {
      type: Schema.Types.Mixed,
      default : null,

    },
    shortListedAt: {
      type: Schema.Types.Date,
      default: null,
    },
    sharedAt: {
      type: Schema.Types.Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default model(MODELS.SHAREDPBUYERPROPERTY, sharedBuyerPropertyInfo);
