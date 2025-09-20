import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episodes.entity';
import { CreateEpisodeDTO } from './dto/create-episode.dto';
import { randomInt, randomUUID } from 'node:crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);
    return sort == 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findOne(id: string) {
    return this.episodes.filter((episode) => episode.id == id);
  }
  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async create(createEpisodeDTO: CreateEpisodeDTO) {
    const newEpisode = { ...createEpisodeDTO, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
