import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}
  @Get()
  findAll() {
    return this.episodeService.findAll();
  }
  @Get('featured')
  featured(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return this.episodeService.findFeatured();
  }

  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return this.episodeService.findOne(id);
  }

  @Post()
  create(@Body() input: CreateEpisodeDTO) {
    console.log(input);
    return this.episodeService.create(input);
  }
}
