import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { deactivateReason, staticStatus } from '../constants/global.constants';

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
        default: 'New'
    },
    tourLink3D: {
        type: Schema.Types.String,
    },
    images: [{
        type: Schema.Types.String,
    }],
    propertyDetails : [{
        type: Schema.Types.ObjectId,
        ref: 'PropertyDetails'
    }],
    deactivateStatus: {
        type: Schema.Types.String,
        trim: true,
        enum: deactivateReason
    }
    // reason , sub-reason, deactive-date
}, { timestamps: true });

export default model(MODELS.PROPERTY, PropertySchema);



