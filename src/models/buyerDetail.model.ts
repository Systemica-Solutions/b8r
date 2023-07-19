import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';
import { furnishingType, houseConfiguration, houseType } from '../constants/global.constants';

const BuyerDetailSchema: Schema = new Schema({
    email: {
        type: Schema.Types.String,
        validate: [EmailValidation, 'Please fill a valid email address'],
        required: true
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true
    },
    panNumber: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS
    },
    houseConfiguration: {
        type: Schema.Types.String,
        trim: true,
        enum: houseConfiguration,
    },
    furnishingType: {
        type: Schema.Types.String,
        trim: true,
        enum: furnishingType,
    },
    houseType: {
        type: Schema.Types.String,
        trim: true,
        enum: houseType,
    },
    preferredLocation: {
        type: Schema.Types.String,
    },
    budget: {
        type: Schema.Types.String,
    },
    moveIn: {
        type: Schema.Types.String,
    },
    version: {
        type: Schema.Types.Number,
        default: 1,
    }
}, { timestamps: true });

export default model(MODELS.BUYERDETAILS, BuyerDetailSchema);
