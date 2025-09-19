import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll() {
    return 'episodes';
  }
  @Get('featured')
  featured(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return 'featured';
  }

  @Get(':id')
  findOne(@Param() id: any) {
    console.log(id);
    return 'one episode';
  }

  @Post()
  create(@Body() input: any) {
    console.log(input);
    return 'new episode';
  }
}
