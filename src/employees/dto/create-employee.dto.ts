import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @IsEmail()
  employeeEmail: string;

  @IsOptional()
  @IsObject()
  locationId?: Location;
}
