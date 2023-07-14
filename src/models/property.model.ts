import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { propertyBasicInfo, propertyFeatureInfo, propertyOwnerInfo, staticStatusInfo } from './common.model';

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
        type: staticStatusInfo,
        default: null
    }
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



