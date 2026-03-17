import {
  ArrayNotEmpty,
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Region } from 'src/regions/entities/region.entity';

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

  @IsObject()
  @IsOptional()
  regionId: Region;
}
