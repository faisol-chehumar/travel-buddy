import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AttractionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  visitDuration!: number; // in minutes
}

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  cuisine!: string;

  @IsNumber()
  @IsNotEmpty()
  mealDuration!: number; // in minutes
}

export class TransportationOptionDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  estimatedDuration!: number; // in minutes
}

export class ItineraryItemDto {
  @IsString()
  @IsNotEmpty()
  time!: string; // format: "HH:MM"

  @IsString()
  @IsNotEmpty()
  activity!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  duration!: number; // in minutes

  @IsString()
  @IsNotEmpty()
  location!: string;
}

export class OneDayPlanResponseDto {}
