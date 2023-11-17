import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SearchDto } from './search.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  searchByTitle(searchDto: SearchDto) {
    return this.ordersRepository.findBy({ title: searchDto.title });
  }
}
