import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  buyerDeactivationReason,
  tenantBuyerStatus,
  tenantDeactivationReason,
} from '../constants/global.constants';

const BuyerSchema: Schema = new Schema(
  {
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      trim: true,
      enum: tenantBuyerStatus,
      default: 'WaitingForProperty',
    },
    buyerDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BuyerDetails',
      },
    ],
    deactivateStatus: {
      type: Schema.Types.String,
      trim: true,
      enum: buyerDeactivationReason,
    },
    isOnBoard: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model(MODELS.BUYER, BuyerSchema);
