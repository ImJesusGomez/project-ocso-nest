import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Manager } from '../../managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('text')
  userEmail: string;

  @Column('text')
  userPassword: string;

  @Column('simple-array', {
    default: ['Employee'],
  })
  userRoles: string[];

  @OneToOne(() => Manager, {
    eager: true,
  })
  manager: Manager;

  @OneToOne(() => Employee, {
    eager: true,
  })
  employee: Employee;
}
