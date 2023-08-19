import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class AuhtEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserEntity;
}
