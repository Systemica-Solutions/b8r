import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { authCodeType } from '../constants/global.constants';

const AuthCodeSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS
    },
    entity: {
        type: Schema.Types.String,
    },
    authCode: {
        type: Schema.Types.String,     // FL=field-agent, BA=property-agent, DA=other
    },
    authCodeType: {
        type: Schema.Types.String,
        enum: authCodeType
    },
    status: {
      type: Schema.Types.Boolean,
      default: false
    },
    startTime: {
        type: Schema.Types.String,
        default: null
    },
    endTime: {
        type: Schema.Types.String,
        default: null
    }
}, { timestamps: true });

export default model(MODELS.AUTHCODE, AuthCodeSchema);

