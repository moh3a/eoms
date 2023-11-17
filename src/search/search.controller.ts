import { Controller, Body, Post } from '@nestjs/common';

import { SearchService } from './search.service';
import { SearchDto } from './search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  update(@Body() searchDto: SearchDto) {
    return this.searchService.searchByTitle(searchDto);
  }
}
