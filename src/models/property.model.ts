import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { propertyBasicInfo, propertyFeatureInfo, propertyOwnerInfo, propertyStatusInfo } from './common.model';

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
    statusInfo: {
        type: propertyStatusInfo,
        default: null
    }
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



