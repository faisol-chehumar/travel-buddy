export interface TimeWindow {
  start: number;
  end: number;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  timeWindow?: TimeWindow;
}

export interface DistanceMatrix {
  [fromId: string]: {
    [toId: string]: number;
  };
}

export interface RouteStop {
  location: Location;
  arrivalTime: number;
}

export interface RouteResult {
  route: RouteStop[];
  totalDistance: number;
}
