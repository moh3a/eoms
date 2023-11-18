import { Controller, Body, Post, Query } from '@nestjs/common';

import { SearchService } from './search.service';
import { SearchDto } from './search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  search(
    @Body() searchDto: SearchDto,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.searchService.searchByTitle(
      searchDto,
      Number(skip),
      Number(take),
    );
  }
}
