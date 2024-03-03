import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { agentType } from '../constants/global.constants';

const BoardSchema: Schema = new Schema(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.AGENT,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.TENANT,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.BUYER,
    },
    propertyId: [
      {
        type: Schema.Types.ObjectId,
        ref: MODELS.PROPERTY,
      },
    ],
    key: {
      // this key will use in future for link generation
      type: Schema.Types.String,
    },
    status: {
      type: Schema.Types.Boolean, // Active/Inactive
      default: false,
    },
    lastVisitedAt: {
      type: Schema.Types.Map,
      of: Schema.Types.Date,
      default: {},
    },
    boardFor: {
      type: Schema.Types.String,
      enum: agentType,
    },
    shareBoardLink: {
      type: Schema.Types.String,
      default: null
    },
    sharedAt: {
      type: Schema.Types.Map,
      of: Schema.Types.Date,
      default: {},
    },
    shortlistedDate: {
      type: Schema.Types.Map,
      of: Schema.Types.Date,
      default: {},
    },
    isShortlisted: {
      type: Schema.Types.Map,
      of: Schema.Types.Boolean,
      default: {},
    }
  },
  { timestamps: true }
);

export default model(MODELS.BOARD, BoardSchema);
