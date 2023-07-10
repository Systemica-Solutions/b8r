import { ENV } from '../config/env.config';

export const GLOBAL = {
    API_PREFIX: ENV.API_PREFIX,
    DATE_FORMATS: ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-DD-MM', 'YYYY-MM-DD', 'DD-MMM-YYYY', 'MMM-DD-YYYY'],
    DEFAULT_DATE_FORMAT: 'YYYY-MM-DD', // All dates will be stored in this format in the database.
    USER_ROLE: ['admin', 'user', 'company'],
    DEFAULT_USER_ROLE: 'user',
    MAIL_TEMPLATE_DIR: 'templates/email',
};


export enum roleCode {
    AGENT = 'AGENT',
    FIELDAGENT = 'FIELDAGENT'
}

export enum houseType {
    Gated_Society = 'Gated Society',
    Gated_Apartment = 'Gated Apartment',
    Individual_House = 'Individual House'
}

export enum houseConfiguration {
    TWO_BHK = '2BHK',
    THREE_BHK = '3BHK',
    FOUR_BHK = '4BHK'
}
