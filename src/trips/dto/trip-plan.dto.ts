import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  placeId?: string;
}

export class TripPlanDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  origin!: LocationDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  destination!: LocationDto;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
