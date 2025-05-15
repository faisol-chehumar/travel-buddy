import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOneDayPlanDto {
  @IsString()
  @IsNotEmpty()
  startPlace!: string;

  @IsString()
  @IsNotEmpty()
  destinationPlace!: string;
}
