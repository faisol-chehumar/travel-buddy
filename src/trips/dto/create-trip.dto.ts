import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class CoordinatesDto {
  @IsNumber()
  @IsNotEmpty()
  latitude!: number;

  @IsNumber()
  @IsNotEmpty()
  longitude!: number;
}

class LocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates!: CoordinatesDto;
}

class StopDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates!: CoordinatesDto;

  @IsNumber()
  @IsOptional()
  duration?: number; // in minutes
}

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  startLocation!: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  endLocation!: LocationDto;

  @ValidateNested({ each: true })
  @Type(() => StopDto)
  @IsOptional()
  stops?: StopDto[];

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsNumber()
  @IsOptional()
  duration?: number; // in minutes

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
