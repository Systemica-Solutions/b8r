import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { propertyBasicInfo, propertyFeatureInfo, propertyOwnerInfo } from './common.model';

const PropertySchema: Schema = new Schema({
    propertyInfo: {
        type: propertyBasicInfo,
        default: null
    },
    ownerInfo: {
        type: propertyOwnerInfo,
        default: null
    },
    featureInfo: {
        type: propertyFeatureInfo,
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS,
        default: null
    },
    status: {
        type: Schema.Types.Boolean,
        default: false
    }
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



