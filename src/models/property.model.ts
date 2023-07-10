import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { PropertyBasicInfo, PropertyFeatureInfo, PropertyOwnerInfo } from './common.model';

const PropertySchema: Schema = new Schema({
    propertyInfo: { 
        type: PropertyBasicInfo       
    }, 
    ownerInfo: {
        type: PropertyOwnerInfo
    }, 
    featureInfo: {
        type: PropertyFeatureInfo
    }
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



