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
  'Studio',
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
}

export enum carParking {
  '1 Car',
  '2 Cars',
  '3 Cars',
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
  'Un-furnished',
  'Semi-furnished',
  'Full-furnished'
}

export enum staticStatus {
  'New',
  'Pending',
  'Verified',
  'Closed',
}

export enum fieldAgentStatus {
  'Unassigned',
  'Pending',
  'DetailsCompleted',
  'Completed'
}

export enum tenantBuyerStatus {
  'WaitingForProperty',
  'Shared',
  'CurrentlyViewing',
  'Shortlisted',
  'Deactivate'
}

export enum tenantDeactivationReason {
  'Rented From B8R',
  'Rented Externally',
  'Does not need anymore',
  'Not responding',
}

export enum buyerDeactivationReason {
  'Sold From B8R',
  'Sold Externally',
  'Does not need anymore',
  'Not responding'
}

export enum propertyStatus {
  'Rented of B8R',
  'Delist / Owner Denied',
  'Rented Outside',
  'Sold on B8R',
  'Delist (Owner Denied)',
  'Sold Outside'
}

export enum agentType {
  'Buyer',
  'Tenant'
}

export enum closeListing1 {
  'Rented of B8R',
  'Rented Outside',
  'Sold on B8R',
  'Sold Outside'
}
export enum closeListing2 {
  'Rented of B8R',
  'Sold on B8R'
}
export enum closeListing3 {
  'Delist / Owner Denied',
  'Delist (Owner Denied)'
}
