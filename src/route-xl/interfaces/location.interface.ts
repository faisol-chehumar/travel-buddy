import { Restrictions } from './restriction.type';

// Restrictions is an array with optional integers ready, due, before and after
// – ready: earliest time the location may be visited (minutes, greater than 0).
// – due: latest time the location must be visited (minutes, greater than 0).
// – before: index number of the location that is the delivery point for this location.
// – after: index number of the location that is the pickup point for this location.
export interface RouteXlLocation {
  address: string;
  lat: number;
  lng: number;
  servicetime?: number;
  restrictions?: Restrictions;
}
