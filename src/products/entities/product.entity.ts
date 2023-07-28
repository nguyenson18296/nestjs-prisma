import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount_price: number;

  @ApiProperty({ required: false, nullable: true })
  slug: string | null;

  @ApiProperty({ required: false, nullable: true })
  state: string;

  @ApiProperty({ required: false, default: false, nullable: true })
  published = false;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
