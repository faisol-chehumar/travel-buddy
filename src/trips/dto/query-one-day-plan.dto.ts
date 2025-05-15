import { IsString, IsNotEmpty } from 'class-validator';

export class QueryOneDayPlanDto {
  @IsString()
  @IsNotEmpty()
  startPlace!: string;

  @IsString()
  @IsNotEmpty()
  destinationPlace!: string;
}
