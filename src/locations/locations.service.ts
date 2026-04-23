import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findBy({ locationId: id });

    if (!location) throw new NotFoundException();

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // 1. Quitar relación previa de managers con esta location
    await this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: null })
      .where('locationId = :id', { id })
      .execute();

    // 2. Precargar la location con los nuevos datos
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!locationToUpdate) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    // 3. Si viene manager, asignarlo
    if (updateLocationDto.manager) {
      const manager = await this.managerRepository.preload({
        managerId: updateLocationDto.manager, // asumiendo que es el id
        location: locationToUpdate,
      });

      if (!manager) {
        throw new NotFoundException(`Manager not found`);
      }

      await this.managerRepository.save(manager);
    }

    // 4. Guardar location
    return await this.locationRepository.save(locationToUpdate);
  }

  async remove(id: number) {
    await this.locationRepository.delete({ locationId: id });
  }
}
