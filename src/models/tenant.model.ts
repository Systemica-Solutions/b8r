import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { staticStatus } from '../constants/global.constants';

const TenantSchema: Schema = new Schema({
      name: {
        type: Schema.Types.String,
        required: true
      },
      status: {
        type: Schema.Types.String,
        trim: true,
        enum: staticStatus,
        default: 'Pending'
      },
      tenantDetails : [{
        type: Schema.Types.ObjectId,
        ref: 'TenantDetails'
      }]
}, { timestamps: true });

export default model(MODELS.TENANT, TenantSchema);
