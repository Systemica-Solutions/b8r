import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { PropertyBasicInfo, PropertyFeatureInfo, PropertyOwnerInfo } from './common.model';

const PropertySchema: Schema = new Schema({
    propertyInfo: {
        type: PropertyBasicInfo,
        default: null
    },
    ownerInfo: {
        type: PropertyOwnerInfo,
        default: null
    },
    featureInfo: {
        type: PropertyFeatureInfo,
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS,
        index: true,
    },
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



