export class Trip {
  id!: string;
  name!: string;
  description?: string;
  startLocation!: {
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation!: {
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  stops?: Array<{
    name: string;
    description?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    duration?: number; // in minutes
  }>;
  date!: Date;
  duration?: number; // in minutes
  userId!: string;
  createdAt!: Date;
  updatedAt?: Date;
}
