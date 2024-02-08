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
    // added agentId here
    agentId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.AGENT,
    },
    status: {
      type: Schema.Types.String,
      trim: true,
      enum: tenantBuyerStatus,
      default: 'WaitingForProperty',
    },
    numberShortlisted: {
      type: Schema.Types.Number,
      default : 0,
    },
    numberShared: {
      type: Schema.Types.Number,
      default : 0,
    },
    buyerDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: MODELS.BUYERDETAILS,
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
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      default: null
    },
  },
  { timestamps: true }
);

export default model(MODELS.BUYER, BuyerSchema);
