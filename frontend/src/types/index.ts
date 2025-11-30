export type Language = 'en' | 'si' | 'ta';
export type MaterialType = 'rice' | 'bread' | 'canned_food' | 'baby_food' | 'first_aid' | 'prescription' | 'pain_relief' | 'drinking_water' | 'purification_tablets' | 'tarpaulin' | 'blankets' | 'tents' | 'adult_clothing' | 'children_clothing' | 'infant_clothing' | 'batteries' | 'flashlights' | 'phone_chargers';
export interface Material {
  type: MaterialType;
  quantity: number;
}
export interface GPSLocation {
  lat: number;
  lng: number;
}
export interface ReliefRequest {
  id: string;
  name: string;
  address: string;
  gpsLocation: GPSLocation | null;
  materials: Material[];
  contactNumbers: string[];
  timestamp: Date;
  language: Language;
}
export interface ReliefRequestInput {
  name: string;
  address: string;
  gpsLocation: GPSLocation | null;
  materials: Material[];
  contactNumbers: string[];
  language: Language;
}