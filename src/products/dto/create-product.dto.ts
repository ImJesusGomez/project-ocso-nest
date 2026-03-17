import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID('4')
  @IsOptional()
  productId?: string;

  @IsString()
  @MaxLength(40)
  productName: string;

  @IsNumber()
  price: number;

  @IsInt()
  countSeal: number;

  @IsObject()
  providerId: string;
}
