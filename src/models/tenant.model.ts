import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';
import { furnishingType, houseConfiguration, houseType } from '../constants/global.constants';

const TenantSchema: Schema = new Schema({
      name: {
        type: Schema.Types.String,
        required: true
      },
      email: {
          type: Schema.Types.String,
          validate: [EmailValidation, 'Please fill a valid email address'],
          unique : true,
          required: true
      },
      phoneNumber: {
        type: Schema.Types.String,
        required: true
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS
      },
      stayDuration: {
        type: Schema.Types.String,
      },
      numberOfMonth: {
        type: Schema.Types.Number,
      },
      houseConfiguration: {
        type: Schema.Types.String,
        trim: true,
        enum: houseConfiguration,
      },
      houseType: {
        type: Schema.Types.String,
        trim: true,
        enum: houseType,
      },
      furnishingType: {
        type: Schema.Types.String,
        trim: true,
        enum: furnishingType,
      },
      preferredLocation: {
        type: Schema.Types.String,
      },
      moveIn: {
        type: Schema.Types.String,
      },
      rent: {
        type: Schema.Types.Number,
      },
      gatedSecurity: {
        type: Schema.Types.Boolean,
      },
      twentyFourSeven: {
        type: Schema.Types.Boolean,
      },
      groceryStore: {
        type: Schema.Types.Boolean,
      },
      swimmingPool: {
        type: Schema.Types.Boolean,
      },
      gym: {
        type: Schema.Types.Boolean,
      },
      clubHouse: {
        type: Schema.Types.Boolean,
      },
      carParking: {
        type: Schema.Types.Boolean,
      },
      bikeParking: {
        type: Schema.Types.Boolean,
      },
      ac: {
        type: Schema.Types.Boolean,
      },
      nonVeg: {
        type: Schema.Types.Boolean,
      },
      bathoroom: {
        type: Schema.Types.Boolean,
      },
      onBoard: {
        type: Schema.Types.Boolean,
        default: false
      }
});

export default model(MODELS.TENANT, TenantSchema);
