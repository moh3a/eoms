import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
