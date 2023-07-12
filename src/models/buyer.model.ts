import { Schema, model } from 'mongoose';
import { MODELS } from '../constants/model.constants';
import { EmailValidation } from '../helpers/validation.helper';
import { furnishingType, houseType } from '../constants/global.constants';

const BuyerSchema: Schema = new Schema({
}, { timestamps: true });

export default model(MODELS.BUYER, BuyerSchema);
