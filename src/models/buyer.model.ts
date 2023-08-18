import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
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
      enum: tenantDeactivationReason,
    },
  },
  { timestamps: true }
);

export default model(MODELS.BUYER, BuyerSchema);
