import { Schema } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { houseType, houseConfiguration, carParking, bikeParking, parkingType, houseHelpRoom, furnishingType, staticStatus } from '../constants/global.constants';

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
    area: {
        type: Schema.Types.String,
    },
    mapLocation: {
        type: Schema.Types.String,
    },
    purposeRent: {
        type: Schema.Types.Boolean,
        default: false
    },
    purposeSale: {
        type: Schema.Types.Boolean,
        default: false
    },
    rented: {
        type: Schema.Types.Boolean,
        default: false
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
        default: false
    },
    nonVeg: {
        type: Schema.Types.Boolean,
        default: false
    },
    constructionYear: {
        type: Schema.Types.String
    },
    availableFrom: {
        type: Schema.Types.String
    },
    rentAmount: {
        type: Schema.Types.Number
    },
    rentDeposit: {
        type: Schema.Types.Number
    },
    rentMaintenance: {
        type: Schema.Types.Number
    },
    lockInPeriod: {
        type: Schema.Types.Number
    },
    saleAmount: {
        type: Schema.Types.Number
    },
    saleDeposit: {
        type: Schema.Types.Number
    },
    saleMaintenance: {
        type: Schema.Types.Number
    },
    moveInFrom: {
        type: Schema.Types.Number
    }
}, { _id: false });

export const staticStatusInfo: Schema = new Schema({

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
