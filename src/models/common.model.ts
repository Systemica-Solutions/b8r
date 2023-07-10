import { Schema } from 'mongoose';
import { houseType, houseConfiguration } from '../constants/global.constants';

export const PropertyBasicInfo: Schema = new Schema({
    houseType: {
        type: Schema.Types.String,
        enum: houseType,
        default: houseType.Individual_House
    },
    houseConfig: {
        type: Schema.Types.String,
        enum: houseConfiguration,
        default: houseConfiguration.TWO_BHK
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
        default: false
      },
      sale: { 
        type: Schema.Types.Boolean,
        default: false
     }
    }
});

export const PropertyOwnerInfo: Schema = new Schema({ 
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
});

export const PropertyFeatureInfo: Schema = new Schema({ 
    gatedSecurity: {
        type: Schema.Types.Boolean,
        default: false
    },
    twentyFourSeven: {
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
        type: Schema.Types.String
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
            type: Schema.Types.Number
        },
        bike: {
            type: Schema.Types.Number
        }, 
        type: {
            type: Schema.Types.String
        }
    },
    houseHelpRoom: {
        type: Schema.Types.String
    },
    bathrooms: {
        type: Schema.Types.Number
    },
    balconies: {
        type: Schema.Types.Number
    },
    furnishingType: {
        type: Schema.Types.String
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
});