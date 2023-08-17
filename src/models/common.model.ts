import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import {
  houseType,
  houseConfiguration,
  carParking,
  bikeParking,
  parkingType,
  houseHelpRoom,
  furnishingType
} from '../constants/global.constants';

export const propertyBasicInfo: Schema = new Schema(
  {
    houseNum: {
      type: Schema.Types.String,
      trim: true,
    },
    societyType: {
      type: Schema.Types.String,
      trim: true,
    },
    houseType: {
      type: Schema.Types.String,
      trim: true,
      enum: houseType,
    },
    houseConfig: {
      type: Schema.Types.String,
      trim: true,
      enum: houseConfiguration,
    },
    area: {
      type: Schema.Types.String,
    },
    mapLocation: {
      type: Schema.Types.String,
    },
    purposeRent: {
      type: Schema.Types.Boolean,
      default: false,
    },
    purposeSale: {
      type: Schema.Types.Boolean,
      default: false,
    },
    rented: {
      type: Schema.Types.Boolean,
      default: false,
    },
    lastEditDate: {
      type: Schema.Types.Date,
    },
    verifyDate: {
      type: Schema.Types.Date,
    },
    closeDate: {
      type: Schema.Types.Date,
    },
    closureReason: {
      type: Schema.Types.String,
    },
    closureSubReason: {
      type: Schema.Types.String,
    },
  },
  { _id: false }
);

export const propertyOwnerInfo: Schema = new Schema(
  {
    name: {
      first: {
        type: Schema.Types.String,
        required: true,
      },
      last: {
        type: Schema.Types.String,
        required: true,
      },
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
    panNumber: {
      type: Schema.Types.String,
    },
    country: {
      type: Schema.Types.String,
      required: true,
    },
    city: {
      type: Schema.Types.String,
    },
  },
  { _id: false }
);

export const propertyFeatureInfo: Schema = new Schema(
  {
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
    carpetArea: {
      type: Schema.Types.Number,
    },
    floors: {
      total: {
        type: Schema.Types.Number,
      },
      your: {
        type: Schema.Types.Number,
      },
    },
    parking: {
      car: {
        type: Schema.Types.String,
        trim: true,
        enum: carParking,
      },
      bike: {
        type: Schema.Types.String,
        trim: true,
        enum: bikeParking,
      },
      type: {
        type: Schema.Types.String,
        trim: true,
        enum: parkingType,
      },
    },
    houseHelpRoom: {
      type: Schema.Types.String,
      trim: true,
      enum: houseHelpRoom,
    },
    bathrooms: {
      type: Schema.Types.Number,
    },
    balconies: {
      type: Schema.Types.Number,
    },
    furnishingType: {
      type: Schema.Types.String,
      trim: true,
      enum: furnishingType,
    },
    ac: {
      type: Schema.Types.Boolean,
      default: false,
    },
    nonVeg: {
      type: Schema.Types.Boolean,
      default: false,
    },
    constructionYear: {
      type: Schema.Types.String,
    },
    availableFrom: {
      type: Schema.Types.String,
    },
    rentAmount: {
      type: Schema.Types.Number,
    },
    rentDeposit: {
      type: Schema.Types.Number,
    },
    rentMaintenance: {
      type: Schema.Types.Number,
    },
    lockInPeriod: {
      type: Schema.Types.Number,
    },
    saleAmount: {
      type: Schema.Types.Number,
    },
    saleDeposit: {
      type: Schema.Types.Number,
    },
    saleMaintenance: {
      type: Schema.Types.Number,
    },
    moveInFrom: {
      type: Schema.Types.Number,
    },
  },
  { _id: false }
);

export const propertyApproveInfo: Schema = new Schema(
  {
    liftLobby: {
      type: Schema.Types.Boolean,
      default: false
    },
    entryDoor: {
      type: Schema.Types.Boolean,
      default: false
    },
    homeEntry: {
      type: Schema.Types.Boolean,
      default: false
    },
    livingRoom: {
      type: Schema.Types.Boolean,
      default: false
    },
    tvArea: {
      type: Schema.Types.Boolean,
      default: false
    },
    kitchen: {
      type: Schema.Types.Boolean,
      default: false
    },
    utilityArea: {
      type: Schema.Types.Boolean,
      default: false
    },
    backyard: {
      type: Schema.Types.Boolean,
      default: false
    },
    commonWashroom: {
      type: Schema.Types.Boolean,
      default: false
    },
    livingRoomBalcony: {
      type: Schema.Types.Boolean,
      default: false
    },
    mainGate: {
      type: Schema.Types.Boolean,
      default: false
    },
    clubHouse: {
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
    parking: {
      type: Schema.Types.Boolean,
      default: false
    },
    feature1: {
      type: Schema.Types.String
    },
    feature2: {
      type: Schema.Types.String
    },
    feature3: {
      type: Schema.Types.String
    }
  },
  { _id: false }
);

export const propertyCloseListingInfo: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
    rentAmount: {
      type: Schema.Types.Number,
    },
    agreementFor: {
      type: Schema.Types.Number,
    },
    tenancyStartDate: {
      type: Schema.Types.Date,
    },
    feedback: {
      type: Schema.Types.String,
    },
  },
  { _id: false }
);

export const propertyReactivateInfo: Schema = new Schema(
  {
    tenantName: {
      type: Schema.Types.String,
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
    vacanyDate: {
      type: Schema.Types.Date,
      default: null
    }
  },
  { _id: false }
);

export const sharedPropertyInfo: Schema = new Schema({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: MODELS.TENANT,
  },
  viewedAt: {
    type: Schema.Types.Date,
    default: null
  },
  isShortlisted: {
    type: Schema.Types.Boolean,
    default: false
  },
  shortListedAt: {
    type: Schema.Types.Date,
    default: null
  },
  sharedAt : {
    type: Schema.Types.Date,
    default: null
  }
}, { timestamps: true });

export default model(MODELS.SHAREDPROPERTY, sharedPropertyInfo);
