import { Injectable } from '@nestjs/common';
import {
  DistanceMatrix,
  RouteResult,
  RouteStop,
  Location,
} from '../interfaces';

@Injectable()
export class RouteOptimizerService {
  constructor() {}

  optimizeRoute(
    locations: Location[],
    distanceMatrix: DistanceMatrix,
  ): RouteResult {
    if (locations.length === 0) {
      return { route: [], totalDistance: 0 };
    }

    const unvisited = new Set(locations.map((loc) => loc.id));
    const route: RouteStop[] = [];

    let currentLocation = locations[0]; // Start from the first location
    let currentTime = 0;
    let totalDistance = 0;

    unvisited.delete(currentLocation.id);
    route.push({ location: currentLocation, arrivalTime: currentTime });

    while (unvisited.size > 0) {
      let nextLocation: Location | null = null;
      let minDistance = Infinity;
      let arrivalTimeAtNext = 0;

      for (const locId of unvisited) {
        const loc = locations.find((l) => l.id === locId)!;
        const distance = distanceMatrix[currentLocation.id][loc.id];
        let arrivalTime = currentTime + distance;

        if (loc.timeWindow) {
          if (arrivalTime > loc.timeWindow.end) {
            continue; // Cannot arrive before time window closes
          }
          if (arrivalTime < loc.timeWindow.start) {
            arrivalTime = loc.timeWindow.start; // Wait until time window opens
          }
        }

        if (distance < minDistance) {
          minDistance = distance;
          nextLocation = loc;
          arrivalTimeAtNext = arrivalTime;
        }
      }

      if (!nextLocation) {
        // No feasible next location found, break to prevent infinite loop
        break;
      }

      route.push({ location: nextLocation, arrivalTime: arrivalTimeAtNext });
      totalDistance += minDistance;
      currentLocation = nextLocation;
      currentTime = arrivalTimeAtNext;
      unvisited.delete(currentLocation.id);
    }

    return { route, totalDistance };
  }
}
