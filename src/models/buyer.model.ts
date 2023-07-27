import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { staticStatus } from '../constants/global.constants';

const BuyerSchema: Schema = new Schema({
    phoneNumber: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        trim: true,
        enum: staticStatus,
        default: 'Pending'
    },
    buyerDetails : [{
        type: Schema.Types.ObjectId,
        ref: 'BuyerDetails'
    }]
}, { timestamps: true });

export default model(MODELS.BUYER, BuyerSchema);
