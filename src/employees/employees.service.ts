import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id,
      },
    });
  }

  async findOne(employeeId: string) {
    const employee = await this.employeeRepository.findOneBy({ employeeId });

    if (!employee) throw new NotFoundException();

    return employee;
  }

  async update(employeeId: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate) throw new NotFoundException();

    const employeeUpdated =
      await this.employeeRepository.save(employeeToUpdate);

    return employeeUpdated;
  }

  async remove(id: string) {
    const { employeeId } = await this.findOne(id);
    await this.employeeRepository.delete(employeeId);

    return {
      message: `El empleado con el ID ${id} eliminado`,
    };
  }
}
