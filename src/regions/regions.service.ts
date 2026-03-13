import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOneBy({ regionId: id });

    if (!region) throw new NotFoundException('Region Not Found');

    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });

    if (!regionToUpdate) throw new NotFoundException('Region not found');

    return this.regionRepository.save(regionToUpdate);
  }

  async remove(id: number) {
    await this.regionRepository.delete({
      regionId: id,
    });
  }
}
