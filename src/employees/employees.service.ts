import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) throw new NotFoundException();

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate) throw new NotFoundException();

    const employeeUpdated =
      await this.employeeRepository.save(employeeToUpdate);

    return employeeUpdated;
  }

  async remove(id: string) {
    const { id: employeeId } = await this.findOne(id);
    await this.employeeRepository.delete(employeeId);

    return {
      message: `El empleado con el ID ${id} eliminado`,
    };
  }
}
