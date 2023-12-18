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
    tenantDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TenantDetails',
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
