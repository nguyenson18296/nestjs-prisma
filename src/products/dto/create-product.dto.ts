import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  discount_price: number;

  @IsString()
  @ApiProperty({ required: false })
  slug?: string;

  @ApiProperty({ required: false, default: 'pending' })
  state?: string;

  @IsBoolean()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  categoryId: number;
}
