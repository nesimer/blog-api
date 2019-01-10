import { Connection } from 'typeorm';
import { User } from './entity/user.entity';

export const userRepository = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: ['MySqlConnection'],
};
