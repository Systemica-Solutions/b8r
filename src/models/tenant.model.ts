import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  tenantDeactivationReason,
  tenantBuyerStatus,
} from '../constants/global.constants';

const TenantSchema: Schema = new Schema(
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
    // made to have only one id
    tenantDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: MODELS.TENANTDETAILS,
      },
    ],
    deactivateStatus: {
      type: Schema.Types.String,
      trim: true,
      enum: tenantDeactivationReason,
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

export default model(MODELS.TENANT, TenantSchema);
