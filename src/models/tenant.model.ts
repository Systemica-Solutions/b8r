import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { tenantStatus, staticStatus } from '../constants/global.constants';

const TenantSchema: Schema = new Schema(
  {
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      trim: true,
      enum: staticStatus,
      default: 'Pending',
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
      enum: tenantStatus,
    },
  },
  { timestamps: true }
);

export default model(MODELS.TENANT, TenantSchema);
