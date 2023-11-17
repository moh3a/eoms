import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ example: 'The order title' })
  title: string;
}
