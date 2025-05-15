import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';

export class CoordinatesDto {
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}

// export class LocationDto {
//   @IsString()
//   @IsNotEmpty()
//   name!: string;

//   @IsString()
//   @IsNotEmpty()
//   district!: string;

//   @IsString()
//   @IsNotEmpty()
//   province!: string;
// }

export class StopDto {
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

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsNumber()
  @IsOptional()
  duration?: number; // in minutes

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @IsNotEmpty()
  tripLocation!: LocationDto[];
}
