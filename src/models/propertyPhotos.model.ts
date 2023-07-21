import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';

const PropertyPhotosSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    propertyId : {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    photos : [{
        type: Schema.Types.String
    }]
}, { timestamps: true });

export default model(MODELS.PROPERTYPHOTOS, PropertyPhotosSchema);
