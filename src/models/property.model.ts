import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { staticStatus, propertyStatus } from '../constants/global.constants';
import { propertyCloseListingInfo, propertyReactivateInfo } from './common.model';

const PropertySchema: Schema = new Schema(
  {
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
      default: 'New',
    },
    propertyDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PropertyDetails',
      },
    ],
    tourLink3D: {
      // tourLink3D and images needs for verify property
      type: Schema.Types.String,
    },
    images: [
      {
        type: Schema.Types.String,
      }
    ],
    imagesApproved: {
      type: Schema.Types.Boolean,
      default: false
    },
    closeListingStatus: {
      // deactive property with close listing
      type: Schema.Types.String,
      trim: true,
      enum: propertyStatus,
    },
    closeListingDetails: {
      type: propertyCloseListingInfo,
      default: null,
    },
    reactivateDetails: {
      type: propertyReactivateInfo,
      default: null,
    },
    sharedProperty :  [
      {
        type: Schema.Types.ObjectId,
        ref: 'SharedProperty',
      },
    ]
  },
  { timestamps: true }
);

export default model(MODELS.PROPERTY, PropertySchema);
