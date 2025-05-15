import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CoordinatesDto } from './create-trip.dto';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  short_description?: string;

  @IsOptional()
  coordinates?: CoordinatesDto;

  @IsString()
  @IsNotEmpty()
  district!: string;

  @IsString()
  @IsNotEmpty()
  province!: string;

  @IsString()
  @IsOptional()
  open?: string;

  @IsString()
  @IsOptional()
  close?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;
}
