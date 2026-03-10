import { ArrayNotEmpty, IsArray, IsString, MaxLength } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @MaxLength(25)
  locationName: string;

  @IsString()
  @MaxLength(125)
  locationAddress: string;

  @IsArray()
  @ArrayNotEmpty()
  locationLatLng: number[];
}
