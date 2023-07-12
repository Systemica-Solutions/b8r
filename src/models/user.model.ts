import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';
import { roleCode } from '../constants/global.constants';

const UserSchema: Schema = new Schema({
    name: {
      type: Schema.Types.String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        validate: [EmailValidation, 'Please fill a valid email address']
    },
    password: {
      type: Schema.Types.String,
      required: true
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    userRole: {
      type: Schema.Types.String,
      enum: roleCode,
      default: roleCode.AGENT
    },
    inviteCode: {
      type: Schema.Types.String,
      default: ''
    },
    authCode: {
      type: Schema.Types.String,
      default: null
    }
    // otp: {
    //   type: Schema.Types.String,
    //   default: ''
    // },
    // otpExpireAt: {
    //   type: Schema.Types.Date,
    //   default: null
    // }
}, { timestamps: true });

export default model(MODELS.USERS, UserSchema);
