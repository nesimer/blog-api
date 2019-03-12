import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getOrDefault } from '../../utils/copy-constructor.tools';

@Entity()
export class User {
  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 200,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', name: 'first_name', length: 100, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', name: 'last_name', length: 100, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', name: 'mobile_phone', length: 31, nullable: true })
  mobilePhone?: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;

  @Column({ name: 'token_boundary', type: 'timestamp', default: () => 'now()' })
  tokenBoundary: Date;

  @UpdateDateColumn()
  updated: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  constructor(copy: Partial<User> = {}) {
    this.email = getOrDefault(copy.email, undefined) as any;
    this.firstName = getOrDefault(copy.firstName, undefined);
    this.lastName = getOrDefault(copy.lastName, undefined);
    this.mobilePhone = getOrDefault(copy.mobilePhone, undefined);
    this.password = getOrDefault(copy.password, '');
    this.tokenBoundary = getOrDefault(copy.tokenBoundary, undefined) as any;
    this.userId = getOrDefault(copy.userId, undefined) as any;
  }
}
