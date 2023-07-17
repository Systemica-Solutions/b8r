import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';
import { furnishingType, houseConfiguration, houseType, staticStatus } from '../constants/global.constants';

const TenantSchema: Schema = new Schema({
      name: {
        type: Schema.Types.String,
        required: true
      },
      email: {
          type: Schema.Types.String,
          validate: [EmailValidation, 'Please fill a valid email address'],
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
        default: false
      },
      gatedSecurity: {
        type: Schema.Types.Boolean,
        default: false
      },
      powerBackup: {
        type: Schema.Types.Boolean,
        default: false
      },
      groceryStore: {
        type: Schema.Types.Boolean,
        default: false
      },
      swimmingPool: {
        type: Schema.Types.Boolean,
        default: false
      },
      gym: {
        type: Schema.Types.Boolean,
        default: false
      },
      clubHouse: {
        type: Schema.Types.Boolean,
        default: false
      },
      carParking: {
        type: Schema.Types.Boolean,
        default: false
      },
      bikeParking: {
        type: Schema.Types.Boolean,
        default: false
      },
      ac: {
        type: Schema.Types.Boolean,
        default: false
      },
      nonVeg: {
        type: Schema.Types.Boolean,
        default: false
      },
      bathoroom: {
        type: Schema.Types.Boolean,
        default: false
      },
      onBoard: {
        type: Schema.Types.Boolean,
        default: false
      },
      status: {
        type: Schema.Types.String,
        trim: true,
        enum: staticStatus,
        default: 'Pending'
      },
      deactivateDate: {
        type: Schema.Types.Date
      },
      deactivateReason: {
        type: Schema.Types.String,
      },
      deactivateSubReason: {
        type: Schema.Types.String,
      },
      version: {
        type: Schema.Types.Number,
        default: 1,
      }
});

export default model(MODELS.TENANT, TenantSchema);
