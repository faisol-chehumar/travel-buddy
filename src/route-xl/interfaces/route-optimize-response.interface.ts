interface RouteStep {
  name: string;
  arrival: number;
  distance: number;
}

export interface RouteOptimizeResponse {
  id: string;
  count: number;
  feasible: boolean;
  route: {
    [key: string]: RouteStep;
  };
}
