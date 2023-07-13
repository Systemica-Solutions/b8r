import { Schema } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { houseType, houseConfiguration, carParking, bikeParking, parkingType, houseHelpRoom, furnishingType, propertyStatus } from '../constants/global.constants';

export const propertyBasicInfo: Schema = new Schema({
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
    houseName: {
        type: Schema.Types.String,
    },
    societyName: {
        type: Schema.Types.String,
    },
    pinCode: {
        type: Schema.Types.String,
    },
    area: {
        type: Schema.Types.String,
    },
    mapLocation: {
        type: Schema.Types.String,
    },
    purpose: {
      rent: {
        type: Schema.Types.Boolean,
      },
      sale: {
        type: Schema.Types.Boolean,
     }
    }
}, { _id: false });

export const propertyOwnerInfo: Schema = new Schema({
    name: {
        first: {
            type: Schema.Types.String,
            required: true
        },
        last: {
            type: Schema.Types.String,
            required: true
        }
    },
    phoneNumber: {
        type: Schema.Types.String,
        required: true
    },
    panNumber: {
        type: Schema.Types.String,
    },
    country: {
        type: Schema.Types.String,
        required: true
    },
    city: {
        type: Schema.Types.String,
    }
}, { _id: false });

export const propertyFeatureInfo: Schema = new Schema({
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
    carpetArea: {
        type: Schema.Types.Number
    },
    floors: {
        total: {
            type: Schema.Types.Number
        },
        your: {
            type: Schema.Types.Number
        }
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
        }
    },
    houseHelpRoom: {
        type: Schema.Types.String,
        trim: true,
        enum: houseHelpRoom,
    },
    bathrooms: {
        type: Schema.Types.Number
    },
    balconies: {
        type: Schema.Types.Number
    },
    furnishingType: {
        type: Schema.Types.String,
        trim: true,
        enum: furnishingType,
    },
    ac: {
        type: Schema.Types.Boolean,
    },
    nonVeg: {
        type: Schema.Types.Boolean,
    },
    constructionYear: {
        type: Schema.Types.String
    },
    availableFrom: {
        type: Schema.Types.String
    },
    rent: {
        amount: {
            type: Schema.Types.Number
        },
        deposit: {
            type: Schema.Types.Number
        },
        maintenance: {
            type: Schema.Types.Number
        },
        lockInPeriod: {
            type: Schema.Types.Number
        }
    },
    sale: {
        amount: {
            type: Schema.Types.Number
        },
        deposit: {
            type: Schema.Types.Number
        },
        maintenance: {
            type: Schema.Types.Number
        },
        moveIn: {
            type: Schema.Types.Number
        }
    }
}, { _id: false });

export const propertyStatusInfo: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODELS.USERS
    },
    version: {
        type: Schema.Types.Number,
        default: 1,
    },
    status: {
        type: Schema.Types.String,
        trim: true,
        enum: propertyStatus,
        default: 'Pending Verification'
    },
    lastEditDate: {
        type: Schema.Types.Date
    },
    verifyDate: {
        type: Schema.Types.Date
    },
    closeDate: {
        type: Schema.Types.Date
    },
    closureReason: {
        type: Schema.Types.String
    },
    closureSubReason: {
        type: Schema.Types.String
    }
}, { _id: false });
