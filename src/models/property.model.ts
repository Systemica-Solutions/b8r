import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { propertyBasicInfo, propertyFeatureInfo, propertyOwnerInfo, staticStatusInfo } from './common.model';
import { staticStatus } from '../constants/global.constants';

const PropertySchema: Schema = new Schema({
    houseName: {
        type: Schema.Types.String,
    },
    societyName: {
        type: Schema.Types.String,
    },
    pinCode: {
        type: Schema.Types.String,
    },
    status: {
        type: Schema.Types.String,
        trim: true,
        enum: staticStatus,
        default: 'Pending'
    },
    propertyDetails : [{
        type: Schema.Types.ObjectId,
        ref: 'PropertyDetails'
    }]
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



