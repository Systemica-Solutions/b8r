import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';

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
    inviteCode: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      default: null
    },
    isFieldAgent: {
      type: Schema.Types.Boolean,
      default: false
    },
    lastResetPasswordDate: {
      type: Schema.Types.Date,
      default: null
    }
}, { timestamps: true });

export default model(MODELS.USERS, UserSchema);
