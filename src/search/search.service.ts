import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { SearchDto } from "./search.dto";
import { PrismaService } from "src/prisma.service";
import { DEFAULT_PAGE_SIZE, MESSAGES } from "src/constants";

@Injectable()
export class SearchService {
  constructor(private db: PrismaService) {}

  searchByTitle(searchDto: SearchDto, skip?: number, take?: number) {
    try {
      return this.db.order.findMany({
        where: { title: { contains: searchDto.title } },
        skip: skip && !isNaN(skip) ? skip : 0,
        take: take && !isNaN(take) ? take : DEFAULT_PAGE_SIZE,
      });
    } catch (error) {
      throw new HttpException(
        MESSAGES.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
