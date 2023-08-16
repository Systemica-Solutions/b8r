import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  houseConfiguration,
  houseType,
  furnishingType,
} from '../constants/global.constants';
import { EmailValidation } from '../helpers/validation.helper';

const TenantDetailSchema: Schema = new Schema(
  {
    version: {
      type: Schema.Types.Number,
      default: 1,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.AGENT,
    },
    email: {
      type: Schema.Types.String,
      validate: [EmailValidation, 'Please fill a valid email address'],
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
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
      default: false,
    },
    gatedSecurity: {
      type: Schema.Types.Boolean,
      default: false,
    },
    powerBackup: {
      type: Schema.Types.Boolean,
      default: false,
    },
    groceryStore: {
      type: Schema.Types.Boolean,
      default: false,
    },
    swimmingPool: {
      type: Schema.Types.Boolean,
      default: false,
    },
    gym: {
      type: Schema.Types.Boolean,
      default: false,
    },
    clubHouse: {
      type: Schema.Types.Boolean,
      default: false,
    },
    carParking: {
      type: Schema.Types.Boolean,
      default: false,
    },
    bikeParking: {
      type: Schema.Types.Boolean,
      default: false,
    },
    ac: {
      type: Schema.Types.Boolean,
      default: false,
    },
    nonVeg: {
      type: Schema.Types.Boolean,
      default: false,
    },
    bathroom: {
      type: Schema.Types.Boolean,
      default: false,
    },
    onBoard: {
      type: Schema.Types.Boolean,
      default: false,
    },
    deactivateDate: {
      type: Schema.Types.Date,
    },
    deactivateReason: {
      type: Schema.Types.String,
    },
    deactivateSubReason: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export default model(MODELS.TENANTDETAILS, TenantDetailSchema);
