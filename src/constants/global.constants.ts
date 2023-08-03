export enum authCodeType {
  'Field Agent',
  'Property Agent',
  'Other',
}

export enum houseType {
  'Flat (in Gated Society)',
  'Individual House(in Gated Society)',
  'Individual Builder Floor',
  'Standalone Individual House',
}

export enum houseConfiguration {
  '2BHK',
  '3BHK',
  '4BHK',
}

export enum carParking {
  '1 Car',
  '2 Cars',
  '3 Cars',
  'Owned Garage',
  'No Car Parking',
}

export enum bikeParking {
  '1 Bike',
  'Included with Car',
  'Owned Garage',
}

export enum parkingType {
  'Covered Roof',
  'Open',
}

export enum houseHelpRoom {
  'None',
  '1 Room',
  '1 Room + Bathroom',
}

export enum furnishingType {
  'Unfurnished',
  'Semi-furnished',
  'Fully-furnished',
}

export enum staticStatus {
  'New',
  'Pending',
  'Verified',
  'Closed',
}

export enum tenantStatus {
  'WaitingForProperty',
  'Shared',
  'CurrentlyViewing',
  'Shortlisted',
  'Deactivate'
}

export enum tenantDeactivationReason {
  'Rented Externally',
  'Does not need anymore',
  'Not responding',
}

export enum propertyStatus {
  'Rented of B8R',
  'Delist / Owner Denied',
  'Rented Outside',
}
