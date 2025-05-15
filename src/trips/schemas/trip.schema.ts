import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

class Coordinates {
  @Prop({ required: true, type: Number })
  latitude!: number;

  @Prop({ required: true, type: Number })
  longitude!: number;
}

class Location {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, type: Coordinates })
  coordinates!: Coordinates;
}

class Stop {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true, type: Coordinates })
  coordinates!: Coordinates;

  @Prop({ type: Number })
  duration?: number; // in minutes
}

@Schema({ timestamps: true })
export class Trip {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true, type: Location })
  startLocation!: Location;

  @Prop({ required: true, type: Location })
  endLocation!: Location;

  @Prop({ type: [Stop] })
  stops!: Stop[];

  @Prop({ required: true, type: Date })
  date!: Date;

  @Prop({ type: Number })
  duration?: number;

  @Prop({ required: true })
  userId!: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
