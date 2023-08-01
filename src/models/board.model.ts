import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';

const BoardSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.TENANT,
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
    lastVisitedDate: {
      type: Schema.Types.Date,
      default: null,
    }
  },
  { timestamps: true }
);

export default model(MODELS.BOARD, BoardSchema);
